import React from 'react'
import axios from 'axios'
import NewSkaterForm from './NewSkaterForm.js'


class LoggedMain extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teams: [],
      logged_user: {
        team_id: 1
      }
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
    this.props.getTeams()
  }

  render(){
    return(
      <div>
      <h1>list of teams</h1>
      {console.log(this.state.teams)}
      <ul>
      {this.state.teams.map(team => {
        return(
          <li key={team.id}>{team.name}</li>
        )
      })}

      </ul>
      <NewSkaterForm logged_user={this.state.logged_user} />
      </div>
    )
  }
}



export default LoggedMain
