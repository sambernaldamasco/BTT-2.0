import React from 'react'
import axios from 'axios'

class NewSkaterForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      veteran: false,
      team_id: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  handleCheckboxChange = (event) => {
    this.setState({
      [event.target.id]: event.target.checked
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const formData = {
      skater: {
        name: this.state.name,
        veteran: this.state.veteran,
        team_id: this.props.logged_user.team_id
      }
    }
    console.log(formData);

    axios.post('http://btt-backend.herokuapp.com/api/v1/skaters', formData)
    .then(response => {
      this.props.getSkaters()
      this.setState({
        name: '',
        veteran: false,
      })

      this.props.assessmentHandleView(null)
    })
    .catch(error => console.log(error))

  }

  render(){
    return(
      <div>
        <h2 className="is-size-3"> add new skater</h2>

        <br/>

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="is-size-5" htmlFor="name"> skater name </label>

            <div className="control">
              <input className="input" type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
            </div>

          </div>
        <div className="field">
        <label lassName="is-size-5" htmlFor="veteran skater"> veteran skater:  </label>

        <input type="checkbox" id="veteran" checked={this.state.veteran} onChange={this.handleCheckboxChange}/>

        </div>


        <input className="button is-primary" type="submit" value="add new skater"/>
        </form>
      </div>
    )
  }

}



export default NewSkaterForm
