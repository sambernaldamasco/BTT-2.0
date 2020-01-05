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
    axios.post(`http://btt-backend.herokuapp.com/api/v1/attendances/`, formData)
    .then(response => {
      console.log(response);
      this.updatePractice()
    })
    .catch(error => console.log(error))
  }

  updatePractice = () => {
    axios.put(`http://btt-backend.herokuapp.com/api/v1/practices/${this.props.currentPractice.id}`, {practice:{has_happened: true}})
    .then(response => {
      console.log(response);
      this.props.getPractices()
    })
    .catch(error => console.log(error))

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
          this.props.currentPractice.skaters.length > 0
          ? <div>
              <ul>
                {this.props.currentPractice.skaters.map(skater => {
                  return <li>{skater.name}</li>
                })}
              </ul>
            </div>
          : <AttendanceForm currentPractice={this.props.currentPractice} submitAttendance={this.submitAttendance} skaters={this.state.skaters}/>
        }

      </div>
    )

  }
}



export default Attendance
