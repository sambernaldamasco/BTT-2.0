import React from 'react'
import axios from 'axios'
import AgilityAssessment from './AgilityAssessment.js'


class SkillsAssessment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lateral_movement: 0,
      hockey_stop: 0,
      plow_stop: 0,
      turning_toe: 0,
      power_slide: 0,
      transitions: 0,
      backwards_skating: 0,
      speed_endurance: 0,
      recovery: 0,
      pack_work: 0,
      strategy_adaptability: 0,
      awareness_communication: 0,
      mental_recovery: 0
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id] : parseInt(event.target.value)
    })
  }

  render(){
    return(
      <div>
      <h1>Skills Assessment</h1>
        <h2>Agility</h2>
        <AgilityAssessment currentSkater={this.props.currentSkater} handleChange={this.handleChange}/>
        <h2>Fitness</h2>

        <h2>Teamwork</h2>

        <h2>Coachability</h2>

      </div>
    )

  }
}



export default SkillsAssessment
