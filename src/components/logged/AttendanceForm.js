import React from 'react'
import axios from 'axios'


class Checkbox extends React.Component {
  state = {
    checked: false
  }

  toggleCheckboxChange = () => {
    const {handleCheckboxChange, id} = this.props

    this.setState(({checked}) => (
      {
        checked: !checked
      }
    ))

    handleCheckboxChange(id)
  }

  render(){
    return(

      <input
        type="checkbox"
        name={this.props.name}
        id={this.props.id}
        checked={this.state.checked}
        onChange={this.toggleCheckboxChange}
      />
    )
  }
}



class AttendanceForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      skaters:[]
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    for(const skater of this.selectedCheckboxes) {
      let formData = {
        attendance: {
          practice_id: this.props.currentPractice.id,
          skater_id: skater
        }
      }

      this.props.submitAttendance(formData)

    }

  }


  componentWillMount = () => {
    this.selectedCheckboxes = new Set()
  }

  toggleCheckbox = (id) => {
    if (this.selectedCheckboxes.has(id)) {
      this.selectedCheckboxes.delete(id)
    } else {
      this.selectedCheckboxes.add(id)
    }
  }

  // createCheckbox = (skater) => {
  //   return(
  //     <input
  //       type="checkbox"
  //       label={skater.name}
  //       id={skater.id}
  //       checked={this.state.checked}
  //       onChange={this.toggleCheckboxChange}
  //     /> )
  // }
  //
  // createCheckboxes = () => {
  //   this.props.skaters.map(skater => {
  //     this.createCheckbox(skater)
  //   })
  // }

  render(){
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          {this.props.skaters.map(skater => {
            console.log(skater);
            return(
              <div>
                <label className="is-size-5" htmlFor="skater name"> {skater.name} </label>
                <Checkbox name={skater.name} id={skater.id} checked={this.state.checked} handleCheckboxChange={this.toggleCheckbox}/>
                <br/>
              </div>
            )
          })}
        <br/>
        <input className="button is-primary" type="submit" value="save"/>
        </form>
      </>
    )
  }

}



export default AttendanceForm
