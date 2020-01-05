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
          msg: 'test'
        },

      }
    }
  }

  changeRubric = (event) => {

    const { rubric } = {...this.state}
    const currentState = rubric
    currentState[event.target.id].msg = this.state.rubric[event.target.id].options[parseInt(event.target.value) - 1]

    // this.setState({
    //   [event.target.id] : event.target.value
    // })
    // let test = this.state.
    let anotherTest = this.state.rubric[event.target.id].options[parseInt(event.target.value) - 1]
    console.log(anotherTest);
    console.log(currentState);
  }

  render(){
    return(
      <div>
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

      </form>
      </div>
    )

  }
}



export default AgilityAssessment
