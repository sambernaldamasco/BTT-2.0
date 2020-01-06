import React from 'react'
import axios from 'axios'
import NewPracticeForm from './NewPracticeForm.js'
import SkaterList from './SkaterList.js'
import PracticeList from './PracticeList.js'
import TeamList from './TeamList.js'
import HomeNav from './HomeNav.js'
import HomeHeader from './HomeHeader.js'



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
      return  <TeamList logged_user={this.props.logged_user} mainHandleView={this.mainHandleView}/>

      case 'assessment':
      return <SkaterList logged_user={this.props.logged_user} mainHandleView={this.mainHandleView}/>

      case 'practice':
      return <PracticeList logged_user={this.props.logged_user} mainHandleView={this.mainHandleView}/>


      default:
      return(
        <div className="container">
        <a className="is-size-1" onClick={()=> this.mainHandleView('roster')}>team roster</a>
        <br/>
        <a className="is-size-1" onClick={()=> this.mainHandleView('assessment')}>skill assessment</a>
        <br/>
        <a className="is-size-1" onClick={()=> this.mainHandleView('practice')}>practice management</a>
        <br/>
        </div>
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
        : <HomeHeader />
      }

      <div>
        <br/>
        {this.renderPage()}
      </div>


      <NewPracticeForm logged_user={this.props.logged_user} />
      </div>
    )
  }
}



export default LoggedMain
