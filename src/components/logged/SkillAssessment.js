import React from 'react'
import axios from 'axios'
import AgilityAssessment from './AgilityAssessment.js'
import FitnessAssessment from './FitnessAssessment.js'
import TeamworkAssessment from './TeamworkAssessment.js'
import Overview from './Overview.js'


const skillsArray = ['lateral_movement', 'hockey_stop', 'plow_stop', 'turning_toe', 'power_slide', 'transitions', 'backwards_skating', 'speed_endurance', 'recovery', 'pack_work', 'strategy_adaptability', 'awareness_communication', 'mental_recovery']

class SkillsAssessment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      view: null,
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
    skillsArray.map(skill =>{
      this.setState({
        [skill]: this.props.currentSkater.skill[skill]
      })
    })

  }

  finishAssessment = () => {
    axios.put(`http://btt-backend.herokuapp.com/api/v1/skills/${this.props.currentSkater.skill.id}`, {skill: this.state})
    .then(response => {
      console.log(response);
      this.updatedSkaterInfo()
      skillsArray.map(skill =>{
        this.setState({
          [skill]: 1
        })
      })
    })
    .catch(error => console.log(error))
  }

  acceptSkater = () => {
    axios.put(`http://btt-backend.herokuapp.com/api/v1/skaters/${this.state.skater.id}`, {skater: {accepted: true} })
    .then(response => {
      this.props.getSkaters()
      this.setState({
        skater: null,
        view: null
      })
      this.props.mainHandleView('roster')
    })
    .catch(error => console.log(error))
  }

  dismissSkater = () => {
    axios.delete(`http://btt-backend.herokuapp.com/api/v1/skaters/${this.state.skater.id}`)
    .then(response => {
      this.props.getSkaters()
      this.setState({
        skater: null,
        view: null
      })
      this.props.assessmentHandleView(null)
    })
    .catch(error => console.log(error))
  }

  updatedSkaterInfo = () => {
    axios.get(`http://btt-backend.herokuapp.com/api/v1/skaters/${this.props.currentSkater.id}`)
    .then(response => {
      console.log(response);
      this.setState({
        skater: response.data,
        view: 'overview'
      })
    })
    .catch(error => console.log(error))
  }


  skillHandleView = (page) => {
    this.setState({
      view: page
    })
  }

  renderPage = () => {
    switch (this.state.view){
      case 'overview':
      return <Overview skater={this.state.skater} acceptSkater={this.acceptSkater} dismissSkater={this.dismissSkater}/>

      default:
      return(
        <>
          <h1 className="title-change is-size-2">{this.props.currentSkater.name.toUpperCase()} / skills assessment</h1>
          <br/>

          <h2 className="title-change is-size-3" id="agility">Agility</h2>
          <AgilityAssessment currentSkater={this.props.currentSkater} handleChange={this.handleChange}/>
          <hr className="lilbreak"/>

          <h2 className="title-change is-size-3" id="fitness">Fitness</h2>
          <FitnessAssessment currentSkater={this.props.currentSkater} handleChange={this.handleChange}/>
          <hr className="lilbreak"/>

          <h2 className="title-change is-size-3" id="teamwork">Teamwork</h2>
          <TeamworkAssessment currentSkater={this.props.currentSkater} handleChange={this.handleChange}/>
          <br/>
          <a className="button is-primary" onClick={this.finishAssessment}> finish assessment </a>


        </>
      )
    }
  }

  componentDidMount(){
    this.resetStats()
  }

  componentDidUpdate(prevProps){
    if (this.props.currentSkater.id !== prevProps.currentSkater.id){
      this.resetStats()
    }
  }

  render(){
    return(
      <>
      <nav class="breadcrumb lillefty" aria-label="breadcrumbs">
        <ul>
          <a onClick={()=>this.props.mainHandleView(null)}>home</a>
          <li><a onClick={()=>this.props.assessmentHandleView(null)}>skaters</a></li>
          <li className="is-active is-primary">skill assessment</li>
        </ul>
      </nav>


      <div className="container">
      {this.renderPage()}

      </div>

      </>
    )

  }
}



export default SkillsAssessment
