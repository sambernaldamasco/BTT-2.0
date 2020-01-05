import React from 'react'
import axios from 'axios'
import Overview from './Overview.js'

class TeamList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      skaters: [],
      currentSkater: ''
    }
  }

  getRoster = () => {
    axios.get(`http://btt-backend.herokuapp.com/api/v1/roster/${this.props.logged_user.team_id}.json`)
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
    this.getRoster()
  }

  render(){
    return(
      <div>
        <h1>Team Roster</h1>
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
          ? <Overview skater={this.state.currentSkater} />
          : null
        }
      </div>
    )

  }
}



export default TeamList
