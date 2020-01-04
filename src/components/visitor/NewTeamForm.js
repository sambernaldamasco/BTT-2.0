import React from 'react'
import axios from 'axios'

class NewTeamForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      invite_code: ''
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
      team: {
        name: this.state.name,
        invite_code: this.state.invite_code
      }
    }
    console.log(formData);

    axios.post('http://btt-backend.herokuapp.com/api/v1/teams', formData)
    .then(response => {
      this.props.getTeams()
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>

        <label htmlFor="invite_code"> Invite Code: </label>
        <input type="text" id="invite_code" value={this.state.invite_code} onChange={this.handleChange}/>

        <input type="submit" value="add new team"/>
        </form>
      </div>
    )
  }

}



export default NewTeamForm
