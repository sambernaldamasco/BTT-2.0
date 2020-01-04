import React from 'react'
import axios from 'axios'

class NewUserForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      invite_code: '',
      team_id: '',
      formError: null
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
        invite_code: this.state.invite_code
      }
    }

    //checking if the invite code is the same from the db invite code from the team
    const checkInviteCode = () => {
      const selectedTeam = this.props.teams.find( ({id}) => id == this.state.team_id)

      return selectedTeam.invite_code === this.state.invite_code ?  true : false
    }
    console.log(formData);

    if (checkInviteCode()) {
      axios.post('http://btt-backend.herokuapp.com/api/v1/users', formData)
      .then(response => {
        console.log(response);
        this.setState({
          username: '',
          password: '',
          invite_code: '',
          team_id: '',
          formError: null
        })
      })
      .catch(error => console.log(error))
    } else {
      this.setState({
        formError: 'Incorrect invite code'
      })
    }
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
          this.state.formError
          ? <h3>{this.state.formError}</h3>
          : null
        }
      </div>
    )
  }

}



export default NewUserForm
