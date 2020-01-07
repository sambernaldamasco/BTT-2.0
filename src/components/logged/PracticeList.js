import React from 'react'
import axios from 'axios'
import Attendance from './Attendance.js'
import NewPracticeForm from './NewPracticeForm.js'

class PracticeList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      practices: [],
      currentPractice: '',
      view: null
    }
  }

  getPractices = () => {
    axios.get(`http://btt-backend.herokuapp.com/api/v1/practicelist/${this.props.logged_user.team_id}.json`)
    .then(response => {
      console.log(response.data)
      this.setState({
        practices: response.data
      })
    })
    .catch(error => console.log(error))
  }

  selectPractice = (practice) => {
    this.setState({
      currentPractice: practice,
      view: 'attendance'
    })
  }

  practiceHandleView = (page) => {
    this.setState({
      view: page
    })
  }

  renderPage = () => {
    switch (this.state.view) {
      case 'attendance':
      return <Attendance currentPractice={this.state.currentPractice} getPractices={this.getPractices} practiceHandleView={this.practiceHandleView}/>

      case 'new':
      return <NewPracticeForm logged_user={this.props.logged_user} getPractices={this.getPractices} practiceHandleView={this.practiceHandleView}/>

      default:
      return (
        <>
          <h1 className="title-change is-size-2">practice management</h1>
          <button className="button is-primary" onClick={()=>this.practiceHandleView('new')}>
            add new practice
          </button>
          <br/>
          <br/>

          <h2 className="title-change is-size-3">upcoming practices</h2>
          <ul>
          {this.state.practices.map(practice => {
            return !practice.has_happened ?
              <li className="is-size-4" key={practice.id} >
                <a onClick={()=>this.selectPractice(practice)}>{practice.date} @ {practice.location} </a>
              </li>
            : null
          })}
          </ul>
          <br/>
          <hr className="lilbreak"/>

          <h2 className="title-change is-size-3">past practices</h2>
          <ul>
          {this.state.practices.map(practice => {
            return practice.has_happened ?
              <li className="is-size-4" key={practice.id}>
                <a onClick={()=>this.selectPractice(practice)}> {practice.date} @ {practice.location} </a>
              </li>
            : null
          })}
          </ul>
        </>
      )
    }
  }


  componentDidMount() {
    this.getPractices()
  }

  render(){
    return(
      <>
        <nav className="breadcrumb lillefty" aria-label="breadcrumbs">
          <ul>
            <li> <a onClick={()=>this.props.mainHandleView(null)}>home</a> </li>
            <li className={this.state.view === null ? "is-active is-primary" : null}> <a onClick={()=>this.practiceHandleView(null)}> practices</a> </li>
            {this.state.view === 'new' ? <li className="is-active is-primary"> <a>new practice</a> </li> : null }
            {this.state.view === 'attendance' ? <li className="is-active is-primary"> <a>attendance</a> </li> : null }
          </ul>
        </nav>

        <div className="container">
          {this.renderPage()}
        </div>
      </>
    )

  }
}



export default PracticeList
