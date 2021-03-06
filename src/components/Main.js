import React from 'react'
import axios from 'axios'
import LoggedMain from './logged/LoggedMain.js'
import VisitorMain from './visitor/VisitorMain.js'
import VisitorHeader from './VisitorHeader.js'


class Main extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        logged_user: null,
        authMsg: null,
    }
  }



  authUser = (formData) => {
    axios.post('http://btt-backend.herokuapp.com/session', formData)
    .then(response => {
      console.log(response.data)
      this.setState({logged_user: response.data, authMsg:null})
    })
    .catch(error => this.setState({authMsg: 'invalid username or password'}))
  }

  logout = () => {
    this.setState({
      logged_user: null
    })
  }

  render(){
    return(
      <>
        {
          this.state.logged_user
          ?
          <LoggedMain logged_user={this.state.logged_user} logout={this.logout}/>
          :
          <>
          <VisitorHeader />
          <VisitorMain authUser={this.authUser} authMsg={this.state.authMsg} />
          </>
        }
        <br/>
        <br/>

      </>
    )
  }
}



export default Main
