import React from 'react'
import axios from 'axios'

class FitnessAssessment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rubric:{
        speed_endurance: {
          options:[
            '25 laps in 5 min',
            '26 laps in 5 min',
            '27 laps in 5 min',
            '29 laps in 5 min',
            '30+ laps in 5 min'
          ],
          msg: ''
        },

        recovery: {
          options:[
            'Very slow to recover/rejoin pack after falls/hits/skating out of bounds/bridging etc',
            '',
            'Inconsistent recovery after falls/hits/skating out of bouts/bridging/etc',
            '',
            'Recovers right away 100% of the time after falls/hits/skating out bounds/bridging/etc'
          ],
          msg: ''
        }

      }
    }
  }

  changeRubric = (event) => {

    const { rubric } = {...this.state}
    const currentState = rubric
    currentState[event.target.id].msg = this.state.rubric[event.target.id].options[parseInt(event.target.value) - 1]

  }

  render(){
    return(
      <>
      <form>
        <label htmlFor="speed and endurance"> speed & endurance: </label>
        <select id="speed_endurance" value={this.props.speed_endurance} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.speed_endurance.msg} </label>

        <label htmlFor="recovery"> recovery: </label>
        <select id="recovery" value={this.props.recovery} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.recovery.msg} </label>

      </form>
      </>
    )

  }
}



export default FitnessAssessment
