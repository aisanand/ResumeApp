import React from 'react';
import Grid from "react-fast-grid";
import '../css/EducationDetails.sass'
import 'react-dropdown/style.css';
import '../css/PersonalDetails.sass'
import EducationDetails from './EducationDetails';

export default class PersonalDetails extends React.Component {

    state = {
        educationDetails: [],
        education: '',
        disabledButton: false,
        educationCount: 2,
        currentForm: false,
        firstName: '',
        emailId: '',
        address: '',
        primaryContactNo: '',
        secondaryContactNo: '',
        workDetails: [],
        work: '',
        allDetails: '',
        firstNameError: '',
        emailIdError: '',
        primarycontactError: '',
        educationDetailsError: '',
        educationDetailsFilled: false,
        callbackHappened: false
    }

    addEducation() {
        this.setState({ disabledButton: true })
        this.setState({ educationDetails: [...this.state.educationDetails, this.state.education] })

    }

    validate = () => {
        if (this.state.firstName === undefined || !this.state.firstName.match(/^[a-z\-_\s]+$/i)) {
            this.firstNameError = "*Enter Valid Name. Valid college name consists of Alphabets and spaces only"
            this.setState({ firstNameError: this.firstNameError })
            return false;
        }
        if (this.state.emailId === undefined || !this.state.emailId.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.emailIdError = "*Enter Valid Email.(eg:abc@gmail.com)"
            this.setState({ firstNameError: undefined })
            this.setState({ emailIdError: this.emailIdError })
            return false;
        }
        if (this.state.primaryContactNo === undefined || !this.state.primaryContactNo.match(/^[6-9]\d{9}$/i)) {
            this.primarycontactError = "*Enter Valid 10 digit Phone Number"
            this.setState({ firstNameError: undefined, emailIdError: undefined })
            this.setState({ primarycontactError: this.primarycontactError })
            return false;
        }
        if (this.state.callbackHappened === false) {
            this.educationDetailsError = "*Save Education details to continue"
            this.setState({ firstNameError: undefined, emailIdError: undefined, primarycontactError: undefined })
            this.setState({ educationDetailsError: this.educationDetailsError })
            return false;
        }
        return true;
    }

    handeSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.educationDetails)
        console.log(this.state.educationDetails.length)
        const isValid = this.validate()
        if (isValid) {
            var json = "{\"name\":\"" + this.state.firstName + "\",\"emailId\":\"" + this.state.emailId + "\",\"address\":\"" + this.state.address
                + "\",\"primaryContactNumber\":\"" + this.state.primaryContactNo + "\",\"secondaryContactNumber\":\"" + this.state.secondaryContactNo + "\",\"educationdetails\":" + this.state.educationDetails;
            this.props.callback(json)
            this.setState({ currentForm: false })
        }
    }

    callback = (educationalData) => {
        this.setState({
            educationDetails: [educationalData],
            callbackHappened: true
        }
        )
    }
    render() {
        const { firstName, emailId, address, primaryContactNo, secondaryContactNo } = this.state
        return (
            <div>
                <form onSubmit={this.handeSubmit} className="container">

                    <Grid container spacing={2} direction="row">
                        <h4 className="heading" style={{ color: "blue" }}> Personal Details </h4>
                        <Grid item sm={6} xs={12}>
                            <div>First Name</div>
                            <input type="firstname" className="form-control" placeholder="Enter firstName" value={firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                            {
                                this.state.firstNameError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.firstNameError}</div> : null
                            }
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <div>Email ID</div>
                            <input type="lastname" className="form-control" placeholder="Enter emailId" value={emailId} onChange={(e) => this.setState({ emailId: e.target.value })} />
                            {
                                this.state.emailIdError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.emailIdError}</div> : null
                            }
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <div>Address</div>
                            <input type="Address" className="form-control" placeholder="Enter Address(Optional)" value={address} onChange={(e) => this.setState({ address: e.target.value })} />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <div>Primary Contact No</div>
                            <input type="Contact No" className="form-control" placeholder="Enter Primary Contact Number" value={primaryContactNo} onChange={(e) => this.setState({ primaryContactNo: e.target.value })} />
                            {
                                this.state.primarycontactError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.primarycontactError}</div> : null
                            }
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <div>Secondary Contact No(Optional)</div>
                            <input type="Contact No" className="form-control" placeholder="Enter Secondary Contact Number" value={secondaryContactNo} onChange={(e) => this.setState({ secondaryContactNo: e.target.value })} />
                        </Grid>
                        <h4 className="heading" style={{ color: "blue" }}>Education Details</h4>
                        <Grid item sm={6} xs={12}>
                            {
                                this.state.educationDetails.map((education, index) => {
                                    return (

                                        <EducationDetails callback={this.callback} />

                                    )
                                })}
                            <button type="button" onClick={(e) => this.addEducation(e)} style={{ marginTop: "10px" }} disabled={this.state.disabledButton}>Add Highest Education to Continue</button>


                        </Grid>
                        {
                            this.state.educationDetailsError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.educationDetailsError}</div> : null
                        }
                        <button type="submit" className="btn btn-primary btn-block" disabled={!this.state.disabledButton}>NEXT</button>

                    </Grid>
                </form></div>
        )



    }


}
