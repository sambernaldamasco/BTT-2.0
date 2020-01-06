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
      <div className="form-container">
      <h2 className="is-size-3"> team registration</h2>
      <br/>
      <form onSubmit={this.handleSubmit}>

        <div class="field">
          <label className="label" htmlFor="name"> name </label>
          <div className="control">
            <input className="input" type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="invite_code"> invite Code </label>

          <div className="control">
          <input className="input" type="text" id="invite_code" value={this.state.invite_code} onChange={this.handleChange}/>
          </div>
        </div>

        <input className="button is-primary" type="submit" value="add new team"/>
        </form>
      </div>
    )
  }

}



export default NewTeamForm
