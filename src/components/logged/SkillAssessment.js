import React from 'react'
import axios from 'axios'
import AgilityAssessment from './AgilityAssessment.js'
import FitnessAssessment from './FitnessAssessment.js'
import TeamworkAssessment from './TeamworkAssessment.js'


class SkillsAssessment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      skater: null,
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

  resetStats = () => {
    const skillsArray = ['lateral_movement', 'hockey_stop', 'plow_stop', 'turning_toe', 'power_slide', 'transitions', 'backwards_skating', 'speed_endurance', 'recovery', 'pack_work', 'strategy_adaptability', 'awareness_communication', 'mental_recovery']

    skillsArray.map(skill =>{
      this.setState({
        [skill]: this.props.currentSkater.skill[skill]
      })
    })
    // this.setState({
    //   lateral_movement: this.props.currentSkater.skill.lateral_movement,
    //   hockey_stop: this.props.currentSkater.skill.hockey_stop,
    //   plow_stop: this.props.currentSkater.skill.plow_stop,
    //   turning_toe: this.props.currentSkater.skill.turning_toe,
    //   power_slide: this.props.currentSkater.skill.power_slide,
    //   transitions: this.props.currentSkater.skill.transitions,
    //   backwards_skating: this.props.currentSkater.skill.backwards_skating,
    //   speed_endurance: this.props.currentSkater.skill.speed_endurance,
    //   recovery: this.props.currentSkater.skill.recovery,
    //   pack_work: this.props.currentSkater.skill.pack_work,
    //   strategy_adaptability: this.props.currentSkater.skill.strategy_adaptability,
    //   awareness_communication: this.props.currentSkater.skill.awareness_communication,
    //   mental_recovery: this.props.currentSkater.skill.mental_recovery
    // })
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

  acceptSkater = () => {
    axios.put(`http://btt-backend.herokuapp.com/api/v1/skaters/${this.props.currentSkater.skill.id}`, {skater: {accepted: true} })
    .then(response => {
      console.log(response);
      this.setState({
        skater: null
      })
    })
    .catch(error => console.log(error))
  }


  componentDidUpdate(prevProps){
    if (this.props.currentSkater.id !== prevProps.currentSkater.id){
      this.resetStats()
    }
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
