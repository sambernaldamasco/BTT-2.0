import React from 'react'
import axios from 'axios'
import NewSkaterForm from './NewSkaterForm.js'
import NewPracticeForm from './NewPracticeForm.js'
import SkaterList from './SkaterList.js'
import PracticeList from './PracticeList.js'



class LoggedMain extends React.Component {
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
      <h1>list of teams</h1>
      {console.log(this.state.teams)}
      <ul>
      {this.state.teams.map(team => {
        return(
          <li key={team.id}>{team.name}</li>
        )
      })}

      </ul>

      <NewSkaterForm logged_user={this.props.logged_user} />
      <SkaterList logged_user={this.props.logged_user} />
      <NewPracticeForm logged_user={this.props.logged_user} />
      <PracticeList logged_user={this.props.logged_user}/>
      </div>
    )
  }
}



export default LoggedMain
