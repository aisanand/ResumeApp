import React from 'react';
import Grid from "react-fast-grid";
import '../css/EducationDetails.sass'
import DatePicker from 'react-date-picker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


export default class EducationDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      skills: [
        { id: 1, value: "java", isChecked: false },
        { id: 2, value: "python", isChecked: false },
        { id: 3, value: "c#", isChecked: false },
        { id: 4, value: "Spring Framework", isChecked: false }
      ]
    }
  }

  state = {
    checkbox: false,
    collegeName: '',
    skills: [],
    skillSet: [],
    startDate: new Date(),
    endDate: new Date(),
    courseTaken: '',
    degree: '',
    collegeNameError: '',
    startDateError: '',
    workExperience: [],
    disabledButton: false,
    requiredDetails: [],
    endDateError: '',
    degreeError: '',
    courseTakenError: ''
  }

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };
  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  validate = () => {
    if (this.state.collegeName === undefined || !this.state.collegeName.match(/^[a-z\d\-_\s]+$/i)) {
      this.collegeNameError = "*Enter Valid College Name. Valid college name consists of Alphabets and numbers only"
      this.setState({ collegeNameError: this.collegeNameError })
      return false;
    }

    if (this.state.startDate === undefined) {
      this.startDateError = "*Enter Valid Start Date.Start date should always be before end date"
      this.setState({collegeNameError:undefined})
      // this.state.collegeNameError = undefined
      this.setState({ startDateError: this.startDateError })
      return false;
    }

    if (this.state.endDate === undefined || this.state.startDate > this.state.endDate) {
      this.setState({collegeNameError:undefined,startDateError:undefined})
      this.endDateError = "*Enter Valid End Date.Start date should always be before end date"
      this.setState({ endDateError: this.endDateError })
      return false;
    }

    if (this.state.degree === undefined) {
      this.setState({collegeNameError:undefined,startDateError:undefined})
      this.setState({endDateError:undefined})
      this.degreeError = "*Choose a Degree"
      this.setState({ degreeError: this.degreeError })
      return false;
    }

    if (this.state.courseTaken === undefined || !this.state.courseTaken.match(/^[a-z\d\-_\s]+$/i)) {
      this.setState({collegeNameError:undefined,startDateError:undefined,endDateError:undefined,degreeError:undefined})
      this.courseTakenError = "Please mention a valid course"
      this.setState({ courseTakenError: this.courseTakenError })
      return false;
    }

    else
      return true;
  }


  handeSubmit = (e) => {
    const isValid = this.validate()
    if (isValid) {
      this.setState({courseTakenError:undefined})
      var requiredJson = "[{ \"collegeName\":\" " + this.state.collegeName +
        "\",\"startDate\":" + JSON.stringify(this.state.startDate) +
        ",\"endDate\":" + JSON.stringify(this.state.endDate) +
        ",\"degree\":\"" + this.state.degree +
        "\",\"areaOfStudy\":\"" + this.state.courseTaken + "\"}]"
      this.props.callback(requiredJson)
      this.setState({ disabledButton: true })
      e.preventDefault()
    }
  }

  handleEdit = () => {
    this.setState({ disabledButton: false })
  }

  render() {
    const { collegeName, courseTaken, degree } = this.state
    const Degreeoptions = [
      'B.Tech/B.E', 'MBA/M.S', 'M.Sc', 'B.Sc', 'B.Com'
    ];
    return (
      <form onSubmit={this.handeSubmit} >
        <Grid container spacing={2} direction="row">
          <Grid item sm={6} xs={12}>
            <div>School Name</div>
            <input name="collegeName" className="form-control" placeholder="Enter SchoolName" value={collegeName} onChange={event => this.setState({ collegeName: event.target.value })} disabled={(this.state.disabledButton) ? "disabled" : ""} />
            {
              this.state.collegeNameError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.collegeNameError}</div> : null
            }
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className='date-range'>
              <span> Start Date </span>
              <DatePicker name="startDate"
                onChange={this.handleStartDateChange}
                value={this.state.startDate}
                dateFormat="DD/MM/YYYY HH:mm:ss"
                disabled={(this.state.disabledButton) ? "disabled" : ""}
              />
              {
                this.state.startDateError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.startDateError}</div> : null
              }
              <span> End Date </span>
              <DatePicker name="endDate"
                dateFormat="DD/MM/YYYY HH:mm:ss"
                onChange={this.handleEndDateChange}
                value={this.state.endDate}

                disabled={(this.state.disabledButton) ? "disabled" : ""}
              />
              {
                this.state.endDateError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.endDateError}</div> : null
              }
            </div>
          </Grid>

          <Grid item sm={12} xs={20}>
            <div>Enter degree
                <Dropdown name="degree" options={Degreeoptions} value={degree} onChange={event => this.setState({ degree: event.value })} placeholder="<Select Option>" disabled={(this.state.disabledButton) ? "disabled" : ""} /></div>
            {
              this.state.degreeError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.degreeError}</div> : null
            }
          </Grid>

          <Grid item sm={6} xs={12}>
            <div>Course Taken</div>
            <input name="Course" className="form-control" placeholder="Area of Study" value={courseTaken} onChange={event => this.setState({ courseTaken: event.target.value })} disabled={(this.state.disabledButton) ? "disabled" : ""} />
            {
              this.state.courseTakenError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.courseTakenError}</div> : null
            }
          </Grid>
        <Grid>
          <button type="button" className="btn btn-primary" onClick={this.handeSubmit} disabled={this.state.disabledButton} style={{ marginTop: "10px" }}>Save</button>
          <button type="button" className="btn btn-primary" onClick={this.handleEdit} disabled={!this.state.disabledButton} style={{ marginLeft: "100px", marginTop: "10px" }}>EDIT</button>
        </Grid>
        </Grid>
      </form>
    )



  }


}
