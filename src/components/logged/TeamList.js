import React from 'react'
import axios from 'axios'
import Overview from './Overview.js'

class TeamList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      skaters: [],
      currentSkater: '',
      view: null
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
      currentSkater: skater,
      view: 'overview'
    })
  }

  teamHandleView = (page) => {
    this.setState({
      view: page
    })
  }

  renderPage = () => {
    switch (this.state.view) {
      case 'overview':
      return <Overview skater={this.state.currentSkater} />

      default:
      return(
        <>
          <h2 className="title-change is-size-2">team roster</h2>
          <ul>
          {this.state.skaters.map(skater => {
            return(
              <li className="is-size-4" key={skater.id} onClick={()=>this.selectSkater(skater)}>{skater.name} </li>
            )
          })}
          </ul>
        </>
      )
    }
  }

  componentDidMount() {
    this.getRoster()
  }

  render(){
    return(
      <div className="container">
      {this.renderPage()}

      </div>
    )

  }
}



export default TeamList
