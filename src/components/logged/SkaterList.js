import React from 'react'
import axios from 'axios'
import SkillAssessment from './SkillAssessment.js'

class SkaterList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      skaters: [],
      currentSkater: ''
    }
  }

  getSkaters = () => {
    axios.get(`http://btt-backend.herokuapp.com/api/v1/assessment/${this.props.logged_user.team_id}.json`)
    .then(response => {
      console.log(response.data)
      this.setState({
        skaters: response.data
      })
    })
    .catch(error => console.log(error))
  }

  selectSkater = (skater) => {
    this.setState({
      currentSkater: skater
    })
  }

  componentDidMount() {
    this.getSkaters()
  }

  render(){
    return(
      <div>
        <h1>list of skaters</h1>
        {console.log(this.state.skaters)}
        <ul>
        {this.state.skaters.map(skater => {
          return(
            <li key={skater.id} onClick={()=>this.selectSkater(skater)}>{skater.name} </li>
          )
        })}
        </ul>
        {
          this.state.currentSkater.id
          ? <SkillAssessment currentSkater={this.state.currentSkater} getSkaters={this.getSkaters}/>
          : null
        }
      </div>
    )

  }
}



export default SkaterList
