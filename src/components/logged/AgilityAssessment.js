import React from 'react'
import axios from 'axios'

class AgilityAssessment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rubric:{
        lateral_movement: {
          options:[
            'Does not move smoothly/effectively from boundary line to boundary line',
            'Can move from boundary line to boundary line when skating foward but could use work to improve smoothness/effectiveness',
            'Can move from boundary line to boundary line both forwards and backwards but could use more work to get movements smooth/effective',
            'Moves smoothly and efficiently from boundary line to boundary line skating forward but choppy movements when skating backwards.',
            'Moves smoothly from boundary line to boundary line skating forwards and backwards'
          ],
          msg: ''
        },

        hockey_stop: {
          options:[
            'Cannot Hockey Stop: does not come to complete stop, cannot do either side, does not execute correct hockey stop form',
            'Inconsistent with effectiveness of stops: does not come to complete stop, cannot do one side, does not execute correct hockey stop form',
            'Can effectively stop on one side, but not the other',
            'Stops effectively on both sides 7 out of 10 times',
            'Stops effectively on both sides 10 out of 10 times'
          ],
          msg: ''
        },

        plow_stop: {
          options:[
            'Cannot Plow Stop',
            'Inconsistent with effectiveness of stop: does not come to complete stop, does not execute correct plow stop form',
            'Stops effectively 5 out of 10 times.',
            'Stops effectively 7 out of 10 times',
            'Stops effectively 10 out of 10 times'
          ],
          msg: ''
        },

        turning_toe: {
          options:[
            'Cannot Turning Toe Stop',
            'Inconsistent with effectiveness of stops: does not come to complete stop, cannot do one side, does not execute correct turning toe stop form',
            'Can effectively stop on one side, but not the other',
            'Stops effectively on both sides 7 out of 10 times',
            'Stops effectively on both sides 10 out of 10 times'
          ],
          msg: ''
        },

        power_slide: {
          options:[
            'Cannot Power Slide',
            'Inconsistent with effectiveness of stops',
            'Can effectively stop on one side, but not the other',
            'Stops effectively on both sides 7 out of 10 times',
            'Stops effectively on both sides 10 out of 10 times'
          ],
          msg: ''
        },

        transitions: {
          options:[
            'Cannot transition from front to back on either side',
            'Effectively transitions from one side, but not the other',
            'Transitions from both sides, but effective less than 5 out of 10 times',
            'Transitions from both sides smoothly 9 out of 10 times.	Transitions from both sides smoothly 10 out of 10 times'
          ],
          msg: ''
        },

        backwards_skating: {
          options:[
            'Can skate backwards but lacks lateral movement, ability to stop or change directions',
            'Can skate backwards and can sometimes assist teammates/block oncoming skaters but does so inconsistently',
            'Can skate backwards and assist teammates but difficulty with one-on-one blocking while backwards',
            'Can skate backwards smoothly, move laterally while backwards, assist teammates while backwards, and can sometimes effectively block opposing teammates while backwards',
            'Can skate backwards and effectively move laterally, block oncoming skaters, and brace walls'
          ],
          msg: ''
        },
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
        <label htmlFor="lateral movement"> Lateral Movement: </label>
        <select id="lateral_movement" value={this.props.lateral_movement} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.lateral_movement.msg} </label>
        <br/>

        <label htmlFor="hockey stop"> Hockey Stop: </label>
        <select id="hockey_stop" value={this.props.hockey_stop} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.hockey_stop.msg} </label>
        <br/>

        <label htmlFor="plow stop"> plow Stop: </label>
        <select id="plow_stop" value={this.props.plow_stop} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.plow_stop.msg} </label>

        <br/>

        <label htmlFor="turning toe stop"> turning toe stop: </label>
        <select id="turning_toe" value={this.props.turning_toe} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.turning_toe.msg} </label>
        <br/>

        <label htmlFor="power slide"> power slide: </label>
        <select id="power_slide" value={this.props.power_slide} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.power_slide.msg} </label>

        <br/>

        <label htmlFor="transitions"> transitions: </label>
        <select id="transitions" value={this.props.plow_stop} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.transitions.msg} </label>
        <br/>

        <label htmlFor="backwards skating"> backwards skating/blocking: </label>
        <select id="backwards_skating" value={this.props.backwards_skating} onChange={event => {this.props.handleChange(event) ; this.changeRubric(event)} }>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>

        <label htmlFor="rubric"> {this.state.rubric.backwards_skating.msg} </label>

      </form>
      </>
    )

  }
}



export default AgilityAssessment
