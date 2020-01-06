import React from 'react'
import axios from 'axios'
import SkillAssessment from './SkillAssessment.js'
import NewSkaterForm from './NewSkaterForm.js'

class SkaterList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      skaters: [],
      currentSkater: '',
      view: null
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
      currentSkater: skater,
      view: 'assessment'
    })
  }

  assessmentHandleView = (page) => {
    this.setState({
      view: page
    })
  }

  componentDidMount() {
    this.getSkaters()
  }

  renderPage = () => {
    switch (this.state.view) {
      case 'assessment':
      return <SkillAssessment currentSkater={this.state.currentSkater} getSkaters={this.getSkaters} assessmentHandleView={this.assessmentHandleView} mainHandleView={this.props.mainHandleView}/>

      case 'new':
      return <NewSkaterForm logged_user={this.props.logged_user} getSkaters={this.getSkaters} assessmentHandleView={this.assessmentHandleView}/>

      default:
      return(
        <div className="container">
          <h1 className="title-change is-size-2">list of skaters</h1>
          <ul>
            {this.state.skaters.map(skater => {
              return(
                <li className="is-size-4" key={skater.id}>
                  <a onClick={()=>this.selectSkater(skater)}> {skater.name} </a>
                </li>
              )
            })}
          </ul>
          <br/>
          <button className="button is-primary" onClick={()=>this.assessmentHandleView('new')}>
            add new skater
          </button>
        </div>
      )
    }
  }

  render(){
    return(
      <>
      {
        this.state.view !== "assessment"
        ?
        <>
        <nav class="breadcrumb lillefty" aria-label="breadcrumbs">
          <ul>
            <li> <a onClick={()=>this.props.mainHandleView(null)}>home</a> </li>
            <li className={this.state.view === null ? "is-active is-primary" : null}> <a onClick={()=>this.assessmentHandleView(null)}> skaters</a> </li>
            {this.state.view === 'new' ? <li className="is-active is-primary"> new skater</li> : null }
          </ul>
        </nav>
        </>
        : null
      }


      {this.renderPage()}

      </>
    )

  }
}



export default SkaterList
