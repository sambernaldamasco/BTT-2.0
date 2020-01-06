import React from 'react'
import axios from 'axios'
import NewTeamForm from './NewTeamForm.js'
import NewUserForm from './NewUserForm.js'
import LogInForm from './LogInForm.js'
import VisitorNav from './VisitorNav.js'


class VisitorMain extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teams: [],
      view: null

    }
  }

  getTeams = () => {
    axios.get('http://btt-backend.herokuapp.com/api/v1/teams.json')
    .then(response => {
      console.log(response.data)
      this.setState({
        teams: response.data
      })
    })
    .catch(error => console.log(error))
  }

  mainHandleView = (page) => {
    this.setState({
      view: page
    })
  }

  renderPage = () => {
    switch (this.state.view) {
      case 'sign up':
      return  <NewUserForm teams={this.state.teams} />

      case 'sign in':
      return <LogInForm teams={this.state.teams} authMsg={this.props.authMsg} authUser={this.props.authUser} />

      case 'register':
      return <NewTeamForm />

      default:
      return(
        <>
        <a className="is-size-1" onClick={()=> this.mainHandleView('register')}>register your team</a>
        <br/>
        <a className="is-size-1" onClick={()=> this.mainHandleView('sign up')}>sign up</a>
        <br/>
        <a className="is-size-1" onClick={()=> this.mainHandleView('sign in')}>sign in</a>
        <br/>
        </>
      )
    }
  }

  componentDidMount() {
    this.getTeams()
  }

  render(){
    return(
      <>
        { this.state.view !== null
          ? <VisitorNav mainHandleView={this.mainHandleView} />
          : null
        }

        <div className="container">
          {this.renderPage()}
        </div>
      </>
    )
  }
}



export default VisitorMain
