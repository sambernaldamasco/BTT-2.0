import React from 'react'
import axios from 'axios'
import NewTeamForm from './NewTeamForm.js'
import NewUserForm from './NewUserForm.js'
import LogInForm from './LogInForm.js'



class VisitorMain extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teams: [],

    }
  }

  getTeams = () => {
    axios.get('http://btt-backend.herokuapp.com/api/v1/teams.json')
    .then(response => {
      console.log(response.data)
      this.setState({
        teams: response.data
      })
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTeams()
  }

  render(){
    return(
      <div>

      <NewTeamForm />
      <NewUserForm teams={this.state.teams} />
      </div>
    )
  }
}



export default VisitorMain
