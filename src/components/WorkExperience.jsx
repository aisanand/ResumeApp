import React from 'react';
import Grid from "react-fast-grid";
import '../css/EducationDetails.sass'
import CheckBox from './Checkbox';
import DatePicker from 'react-date-picker';
import 'react-dropdown/style.css';





class WorkExperience extends React.Component {

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
    skills: [],
    skillSet: [],
    startDate: new Date(),
    endDate: new Date(),
    jobDescription:'',
    designation:'',
    workExperience:'',
    achievement:'',
    personalProfile:'',
    designationError:'',
    workExperienceError:'',
    jobDescriptionError:'',
    skillsError:'',
    startDateError:'',
    endDateError:'',
    pageSubmitted:false
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
  handleCheckChieldElement = (event) => {
    let skills = this.state.skills
    skills.forEach(skill => {
      if (skill.value === event.target.value) {
        skill.isChecked = event.target.checked
      }
      if (skill.isChecked) {
        if (this.state.skillSet !== undefined && this.state.skillSet.indexOf(skill) === -1) {
          this.setState({ skillSet: [...this.state.skillSet, skill.value] })
        }
        else {
          this.setState({ skillSet: [skill.value] })
        }
      }
    })
    this.setState({ skills: skills })
  }

  validate=()=>{
    if(this.state.designation===undefined||!this.state.designation.match(/^[a-z\-_\s]+$/i))
    {
     this.designationError="*Enter Valid designation"
     this.setState({designationError: this.designationError})
      return false;
    }
    if(this.state.workExperience===undefined||!this.state.workExperience.match(/^[0-9\b]+$/))
    {
      this.setState({designationError:undefined})
     this.workExperienceError="*Enter Valid Work Experience(In Years)"
     this.setState({workExperienceError: this.workExperienceError})
      return false;
    }
    if(this.state.jobDescription===undefined||!this.state.jobDescription.match(/^[a-z\-_\s\d]+$/i))
    {
      this.setState({workExperienceError:undefined})
     this.jobDescriptionError="*Enter Job Description"
     this.setState({jobDescriptionError: this.jobDescriptionError})
      return false;
    }
    if(this.state.skillSet===undefined)
    {
      this.setState({designationError:undefined,workExperienceError:undefined,jobDescriptionError:undefined})
     this.skillsError="*Enter Atleast one Skills"
     this.setState({skillsError: this.skillsError})
      return false;
    }
    if (this.state.startDate === undefined) {
      this.setState({designationError:undefined,workExperienceError:undefined,jobDescriptionError:undefined,skillsError:undefined})
      this.startDateError = "*Enter Valid Start Date.Start date should always be before end date"
      this.setState({ startDateError: this.startDateError })
      return false;
    }

    if (this.state.endDate === undefined || this.state.startDate > this.state.endDate) {
      this.setState({designationError:undefined,workExperienceError:undefined,jobDescriptionError:undefined,skillsError:undefined,startDateError:undefined})
      this.endDateError = "*Enter Valid End Date.Start date should always be before end date"
      this.setState({ endDateError: this.endDateError })
      return false;
    }

    return true;
  }
  handeSubmit = (e) => {
    e.preventDefault()
    const isValid=this.validate()
    if(isValid){
    var requiredJson= ",  \"workExperience\":[{ \"designation\":\" " + this.state.designation+
      "\",\"workExperience\":\"" +this.state.workExperience+
      "\",\"jobDescription\":\""+ this.state.jobDescription+
      "\",\"achievements\":\""+ this.state.achievement+
      "\",\"skills\":\""+this.state.skillSet+
      "\",\"startDate\":"+JSON.stringify(this.state.startDate)+
      ",\"endDate\":"+JSON.stringify(this.state.endDate)+
      "}]}"
      this.props.callback(requiredJson)
      this.setState({pageSubmitted:true})
      // this.props.history.push('/thank-you'); 
    }}

  render() {
    const{designation,workExperience,jobDescription,achievement}=this.state
    const defaultSkill = "Select Option"
    return (
      <form onSubmit={this.handeSubmit} className="container">
        <h4 className="heading" style={{ color: "blue" }}> Work Experience </h4>
        <Grid container spacing={2} direction="column">
        <Grid item sm={6} xs={12}>
          <div>Designation</div>
          <input name="designation" className="form-control" placeholder="Enter Designation" value={designation} onChange={(e)=>this.setState({designation : e.target.value})}/>
          {
              this.state.designationError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.designationError}</div> : null
            }
        </Grid>
        <Grid item sm={6} xs={12}>
          Work Experience(In years)
          <input type="workExperience" className="form-control" placeholder="Enter Experience" value={workExperience} onChange={(e)=>this.setState({workExperience : e.target.value})}/>
          {
              this.state.workExperienceError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.workExperienceError}</div> : null
            }
        </Grid>
        <Grid item sm={6} xs={12}>
          Job Description
          <input type="jobDescription" className="form-control" placeholder="Tell us about your job" value={jobDescription} onChange={(e)=>this.setState({jobDescription : e.target.value})}/>
          {
              this.state.jobDescriptionError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.jobDescriptionError}</div> : null
            }
        </Grid>
        <Grid item sm={6} xs={12}>
          Achievement
          <input type="achievement" className="form-control" placeholder="Enter Achievement(Optional)" value={achievement} onChange={(e)=>this.setState({achievement : e.target.value})}/>
        </Grid>
        <Grid item sm={12} xs={20}>
           Skills
            <input name="Skills" className="form-control" placeholder={this.state.skillSet} />
            <ul>
              {
                this.state.skills.map((skill) => {
                  return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement} key={skill.id} {...skill} defaultChecked={defaultSkill} />)
                })
              }
                {
              this.state.skillsError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.skillsError}</div> : null
            }
            </ul>
          </Grid> 
         
         <Grid>
            <span> Start Date </span>
            <DatePicker name="startDate"
              onChange={this.handleStartDateChange}
              value={this.state.startDate}
              dateFormat="DD/MM/YYYY HH:mm:ss"
            />
             {
              this.state.startDateError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.startDateError}</div> : null
            }
            <span> End Date </span>
            <DatePicker name = "endDate"
              onChange={this.handleEndDateChange}
              value={this.state.endDate}
              dateFormat="DD/MM/YYYY HH:mm:ss"
            />
             {
              this.state.endDateError ? <div style={{ color: "red", fontSize: "1vw" }}>{this.state.endDateError}</div> : null
            }
          </Grid>
          <Grid item sm={12} xs={20}>
         <div>
          <button type="submit" className="btn btn-primary btn-block button">Submit</button>
          </div>
          </Grid>
          </Grid>
      </form>
    )



  }


}
export default WorkExperience;