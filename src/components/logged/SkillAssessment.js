import React from 'react'
import axios from 'axios'
import AgilityAssessment from './AgilityAssessment.js'
import FitnessAssessment from './FitnessAssessment.js'
import TeamworkAssessment from './TeamworkAssessment.js'


class SkillsAssessment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lateral_movement: 1,
      hockey_stop: 1,
      plow_stop: 1,
      turning_toe: 1,
      power_slide: 1,
      transitions: 1,
      backwards_skating: 1,
      speed_endurance: 1,
      recovery: 1,
      pack_work: 1,
      strategy_adaptability: 1,
      awareness_communication: 1,
      mental_recovery: 1
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id] : parseInt(event.target.value)
    })
  }

  finishAssessment = () => {
    axios.put(`http://btt-backend.herokuapp.com/api/v1/skills/${this.props.currentSkater.skill.id}`, {skill: this.state})
    .then(response => {
      console.log(response);
      this.setState({
        lateral_movement: 1,
        hockey_stop: 1,
        plow_stop: 1,
        turning_toe: 1,
        power_slide: 1,
        transitions: 1,
        backwards_skating: 1,
        speed_endurance: 1,
        recovery: 1,
        pack_work: 1,
        strategy_adaptability: 1,
        awareness_communication: 1,
        mental_recovery: 1
      })
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div>
      <h1>Skills Assessment</h1>
        <h2>Agility</h2>
        <AgilityAssessment currentSkater={this.props.currentSkater} handleChange={this.handleChange}/>

        <h2>Fitness</h2>
        <FitnessAssessment currentSkater={this.props.currentSkater} handleChange={this.handleChange}/>

        <h2>Teamwork</h2>
        <TeamworkAssessment currentSkater={this.props.currentSkater} handleChange={this.handleChange}/>

        <button onClick={this.finishAssessment}>submit</button>
      </div>
    )

  }
}



export default SkillsAssessment
