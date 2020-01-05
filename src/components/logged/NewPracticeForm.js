import React from 'react'
import axios from 'axios'

class NewPracticeForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      date: '',
      location: '',
      has_happened: false
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
      practice: {
        location: this.state.location,
        date: this.state.date,
        team_id: this.props.logged_user.team_id,
        has_happened: this.state.has_happened
      }
    }

    axios.post('http://btt-backend.herokuapp.com/api/v1/practices', formData)
    .then(response => {
      console.log(response);
      this.setState({
        date: '',
        location: '',
        has_happened: false
      })
    })
    .catch(error => console.log(error))

  }



  render(){
    return(
      <>
        <form onSubmit={this.handleSubmit}>

        <label htmlFor="date"> date: </label>
        <input type="date" id="date" value={this.state.date} onChange={this.handleChange}/>

        <label htmlFor="location"> location: </label>
        <input type="text" id="location" value={this.state.location} onChange={this.handleChange}/>

        <input type="submit" value="add practice"/>
        </form>
      </>
    )
  }

}



export default NewPracticeForm
