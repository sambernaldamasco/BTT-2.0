import React from 'react'
import axios from 'axios'

class TeamworkAssessment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rubric:{
        pack_work: {
          options:[
            'Lone wolf, does not skate well with others',
            'Frequently skates individually in a pack vs. working with teammates',
            'Inconsistently works with teammates; at times, a great team player, at other times, lone wolf',
            'Works well in a pack but only with certain skaters',
            'Works seamlessly with everyone on the team when in a pack'
          ],
          msg: ''
        },

        strategy_adaptability: {
          options:[
            'Not able to understand/implement team strategies',
            'Has some difficulty understanding new strategies/Rarely implements strategies practices in gameplay drills or games',
            'Understands team strategies but inconsistently implements them in gameplay drills and during games',
            'Understands team strategies and frequently implements these strategies in gameplay',
            'Understands and clearly implements team strategies in games and practice'
          ],
          msg: ''
        },

        awareness_communication: {
          options:[
            'No awareness/no communicaiton',
            'Sometimes displays good awareness, but rarely communicates with teammates on the track',
            'Inconsistent with awareness/communication',
            'Aware of gameplay at practices/games, but minimal communication to teammates',
            'Great awareness and excellent communication to teammates during gameplay drills at practice and at games'
          ],
          msg: ''
        },

        mental_recovery: {
          options:[
            'No awareness/no communicaiton',
            'Sometimes displays good awareness, but rarely communicates with teammates on the track',
            'Inconsistent with awareness/communication',
            'Aware of gameplay at practices/games, but minimal communication to teammates',
            'Great awareness and excellent communication to teammates during gameplay drills at practice and at games'
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
        <label htmlFor="pack work"> pack work: </label>
        <select id="pack_work" value={this.props.pack_work} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.pack_work.msg} </label>
        <br/>
        <label htmlFor="Strategy and Adaptability"> Strategy and Adaptability: </label>
        <select id="strategy_adaptability" value={this.props.strategy_adaptability} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.strategy_adaptability.msg} </label>
        <br/>

        <label htmlFor="awareness and communication"> awareness and communication: </label>
        <select id="awareness_communication" value={this.props.awareness_communication} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.awareness_communication.msg} </label>
        <br/>

        <label htmlFor="mental recovery"> mental recovery: </label>
        <select id="mental_recovery" value={this.props.mental_recovery} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.mental_recovery.msg} </label>
      </form>
      </>
    )

  }
}



export default TeamworkAssessment
