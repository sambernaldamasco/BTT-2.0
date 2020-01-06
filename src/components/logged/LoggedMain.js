import React from 'react'
import axios from 'axios'
import NewSkaterForm from './NewSkaterForm.js'
import NewPracticeForm from './NewPracticeForm.js'
import SkaterList from './SkaterList.js'
import PracticeList from './PracticeList.js'
import TeamList from './TeamList.js'
import HomeNav from './HomeNav.js'



class LoggedMain extends React.Component {
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
      view:page
    })
  }

  renderPage = () => {
    switch (this.state.view) {
      case 'roster':
      return  <TeamList logged_user={this.props.logged_user}/>

      case 'assessment':
      return <SkaterList logged_user={this.props.logged_user} />

      case 'practice':
      return <PracticeList logged_user={this.props.logged_user}/>


      default:
      return(
        <>
        <a className="is-size-1" onClick={()=> this.mainHandleView('roster')}>team roster</a>
        <br/>
        <a className="is-size-1" onClick={()=> this.mainHandleView('assessment')}>skill assessment</a>
        <br/>
        <a className="is-size-1" onClick={()=> this.mainHandleView('practice')}>practice management</a>
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
      <div>
      { this.state.view !== null
        ? <HomeNav mainHandleView={this.mainHandleView} />
        : null
      }

      <div className="container">
        <br/>
        {this.renderPage()}
      </div>

      <NewSkaterForm logged_user={this.props.logged_user} />

      <NewPracticeForm logged_user={this.props.logged_user} />
      </div>
    )
  }
}



export default LoggedMain
