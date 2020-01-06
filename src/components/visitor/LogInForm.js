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

    this.props.authUser(formData)
    this.setState({
      username: '',
      password: ''
    })
  }

  render(){
    return(
      <div className="form-container">
        <h2 className="is-size-3"> sign in</h2>
        <br/>

        <form onSubmit={this.handleSubmit}>

          <div className="field">
            <label className="label" htmlFor="teams"> team </label>

            <div className="control">
              <div className="select">
                <select id="team_id" value={this.state.team_id} onChange={this.handleChange}>
                  <option value="">---- select a team ------</option>
                  {this.props.teams.map(team => {
                    return(
                      <option value={team.id} key={team.id}>{team.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="username"> username </label>

            <div className="control">
            <input className="input" type="text" id="username" value={this.state.username} onChange={this.handleChange}/>
            </div>
          </div>

          <div className="field">
            <label htmlFor="password"> password: </label>

            <div className="control">
            <input className="input" type="password" id="password" value={this.state.password} onChange={this.handleChange}/>
            </div>
            {
              this.props.authMsg
              ? <p className="help is-danger is-size-4">{this.props.authMsg}</p>
              : null
            }
          </div>


        <input className="button is-primary" type="submit" value="log in"/>
        </form>

      </div>
    )
  }

}



export default LogInForm
