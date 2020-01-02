import React from 'react'
import axios from 'axios'

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teams: []
    }
  }


  getTeams = () => {
    axios.get('http://btt-backend.herokuapp.com/api/v1/teams.json')
    .then(response => {
      console.log(response)
      this.setState({
        teams: response.data
      })
    })
    .catch(error => console.log(error))
  }


  componentDidMount() {
    this.getTeams()
  }

  render(){
    return(
      <div>list of teams</div>
    )
  }
}



export default Main
