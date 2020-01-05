import React from 'react'
import axios from 'axios'
import Attendance from './Attendance.js'

class PracticeList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      practices: [],
      currentPractice: ''
    }
  }

  getPractices = () => {
    axios.get(`http://btt-backend.herokuapp.com/api/v1/practicelist/${this.props.logged_user.team_id}.json`)
    .then(response => {
      console.log(response.data)
      this.setState({
        practices: response.data
      })
    })
    .catch(error => console.log(error))
  }

  selectPractice = (practice) => {
    this.setState({
      currentPractice: practice
    })
  }

  componentDidMount() {
    this.getPractices()
  }

  render(){
    return(
      <div>
        <h1>list of practices</h1>

        <h2>upcoming practices</h2>
        <ul>
        {this.state.practices.map(practice => {
          return !practice.has_happened ?
            <li key={practice.id} onClick={()=>this.selectPractice(practice)}>{practice.date} @ {practice.location} </li>
          : null
        })}
        </ul>

        <h2>past practices</h2>
        <ul>
        {this.state.practices.map(practice => {
          return practice.has_happened ?
            <li key={practice.id} onClick={()=>this.selectPractice(practice)}>{practice.date} @ {practice.location} </li>
          : null
        })}
        </ul>

        {
          this.state.currentPractice
          ? <Attendance currentPractice={this.state.currentPractice} getPractices={this.getPractices}/>
          : null
        }
      </div>
    )

  }
}



export default PracticeList
