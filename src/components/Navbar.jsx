import React from 'react';

import Grid from "react-fast-grid";
import axios from "axios";

import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience';
import { Redirect } from 'react-router-dom';



class Navbar extends React.Component {
  state = {
    currentForm: true,
    personaldata: [],
    workDetails: [],
    jsonRequest: [],
    count: 1,
    disabledButton: false,
    submitted: false,
    profileExist: false,
    profileExistRedirect: '/profile-exists',
    submitRedirect: '/thank-you'
  }



  callback = (data) => {
    this.setState({ count: this.state.count + 1 })
    this.setState({ currentForm: false })
    console.log(this.state.count)
    if (this.state.count === 1) {
      this.setState({ jsonRequest: [data] })
    }
    if (this.state.count === 2) {
      console.log("HAndling submit!!!!!!!!1")
      var jsonRequestAPI = this.state.jsonRequest + data
      this.handleSubmit(jsonRequestAPI)

    }

  }
  addWork() {
    this.setState({ disabledButton: true })
    this.setState({ workDetails: [...this.state.workDetails, this.state.work] })
  }

  handleSubmit(jsonRequestAPI) {
    console.log(jsonRequestAPI)
    console.log("before axios")
    axios.post('http://localhost:8080/addResume', jsonRequestAPI,
      { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          this.setState({ submitted: true })
        }
        else {
          this.setState({ profileExist: true })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }


  render() {
    return (
      this.state.currentForm ? <div><PersonalDetails callback={this.callback} /></div> :
        <div>
          {
            this.state.workDetails.map((work, index) => {
              return (
                <Grid item sm={6} xs={12}>
                  <div>
                    <div key={index}>
                      <WorkExperience callback={this.callback} />
                    </div>
                  </div>
                </Grid>
              )
            }
            )}
          <div style={{ paddingLeft: "60px", paddingTop: "10px" }}>
            <button type="button" onClick={(e) => this.addWork(e)} disabled={this.state.disabledButton}>Add Work to Submit</button>
            {this.state.submitted && <div><Redirect to={this.state.submitRedirect} /></div>}

            {this.state.profileExist && <div><Redirect to={this.state.profileExistRedirect} /></div>}
          </div>

        </div>
    )
  }
}

export default Navbar;
