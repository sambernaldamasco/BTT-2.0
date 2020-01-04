import React from 'react'
import axios from 'axios'

class LogInForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      team_id: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const formData = {
      user: {
        username: this.state.username,
        team_id: this.state.team_id,
        password: this.state.password,
      }
    }

    console.log(formData);

  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="teams"> team: </label>
        <select id="team_id" value={this.state.team_id} onChange={this.handleChange}>
          <option value="">---- select a team ------</option>
          {this.props.teams.map(team => {
            return(
              <option value={team.id} key={team.id}>{team.name}</option>
            )
          })}
        </select>

        <label htmlFor="invite code"> invite code: </label>
        <input type="text" id="invite_code" value={this.state.invite_code} onChange={this.handleChange}/>

        <label htmlFor="username"> username: </label>
        <input type="text" id="username" value={this.state.username} onChange={this.handleChange}/>

        <label htmlFor="password"> password: </label>
        <input type="password" id="password" value={this.state.password} onChange={this.handleChange}/>

        <input type="submit" value="create account"/>
        </form>
        {
          this.props.authMsg
          ? <h3>{this.props.authMsg}</h3>
          : null
        }
      </div>
    )
  }

}



export default LogInForm
