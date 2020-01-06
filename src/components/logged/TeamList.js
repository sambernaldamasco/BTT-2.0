import React from 'react'
import axios from 'axios'
import Overview from './Overview.js'

class TeamList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      skaters: [],
      currentSkater: '',
      practiceCount: 0,
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

  totalTeamPractices = () => {
      axios.get(`http://btt-backend.herokuapp.com/api/v1/practicelist/${this.props.logged_user.team_id}.json`)
      .then(response => {
        console.log(response.data)
        this.setState({
          practiceCount: response.data.length
        })
      })
      .catch(error => console.log(error))
  }

  renderPage = () => {
    switch (this.state.view) {
      case 'overview':
      return <Overview skater={this.state.currentSkater} practiceCount={this.state.practiceCount}/>

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
    this.totalTeamPractices()
  }

  render(){
    return(
      <>
      <nav class="breadcrumb is-left lillefty" aria-label="breadcrumbs">
        <ul>
          <li> <a onClick={()=>this.props.mainHandleView(null)}>home</a> </li>
          <li className={this.state.view === null ? "is-active" : null}> <a onClick={()=>this.teamHandleView(null)}>team</a> </li>
          {this.state.view === 'overview' ? <li className="is-active"> overview</li> : null }
        </ul>
      </nav>

        <div className="container">
          {this.renderPage()}

        </div>
      </>
    )

  }
}



export default TeamList
