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
      console.log(response);
      this.setState({
        name: '',
        veteran: false,
      })
    })
    .catch(error => console.log(error))

  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="name"> Skater Name: </label>
        <input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>

        <label htmlFor="veteran skater"> veteran skater: </label>
        <input type="checkbox" id="veteran" checked={this.state.veteran} onChange={this.handleCheckboxChange}/>

        <input type="submit" value="add new skater"/>
        </form>
      </div>
    )
  }

}



export default NewSkaterForm
