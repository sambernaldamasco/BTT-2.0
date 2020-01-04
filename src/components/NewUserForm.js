import React from 'react'
import axios from 'axios'

class NewUserForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      invite_code: '',
      team_id: ''
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
        username: this.state.name,
        team_id: this.state.team_id,
        invite_code: this.state.invite_code

      }
    }
    console.log(formData);

    // axios.post('http://btt-backend.herokuapp.com/api/v1/skaters', formData)
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error => console.log(error))

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
              <option value={team.id} >{team.name}</option>
            )
          })}
        </select>

        <label htmlFor="invite code"> invite code: </label>
        <input type="text" id="invite_code" value={this.state.invite_code} onChange={this.handleChange}/>

        <label htmlFor="name"> username: </label>
        <input type="text" id="username" value={this.state.username} onChange={this.handleChange}/>

        <label htmlFor="password"> password: </label>
        <input type="password" id="password" value={this.state.password} onChange={this.handleChange}/>

        <input type="submit" value="add new skater"/>
        </form>
      </div>
    )
  }

}



export default NewUserForm
