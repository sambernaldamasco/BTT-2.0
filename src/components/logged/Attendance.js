import React from 'react'
import axios from 'axios'
import AttendanceForm from './AttendanceForm.js'

class Attendance extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      skaters: []
    }
  }

  submitAttendance = (formData) => {
    console.log(formData);
  }

  getRoster = () => {
    axios.get(`http://btt-backend.herokuapp.com/api/v1/roster/${this.props.currentPractice.team_id}.json`)
    .then(response => {
      console.log(response.data)
      this.setState({
        skaters: response.data
      })
    })
    .catch(error => console.log(error))

  }

  componentDidMount(){
    this.getRoster()
  }

  render(){
    return(
      <div>
        <h1>{this.props.currentPractice.date} @ {this.props.currentPractice.location}</h1>
        {
          this.props.currentPractice.skaters
          ? <div>
              <ul>
                {this.props.currentPractice.skaters.map(skater => {
                  return <li>{skater.name}</li>
                })}
              </ul>
            </div>
          : null
        }
        <AttendanceForm currentPractice={this.props.currentPractice} submitAttendance={this.submitAttendance} skaters={this.state.skaters}/>
      </div>
    )

  }
}



export default Attendance
