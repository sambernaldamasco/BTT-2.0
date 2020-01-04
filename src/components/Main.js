import React from 'react'
import axios from 'axios'
import LoggedMain from './logged/LoggedMain.js'
import VisitorMain from './visitor/VisitorMain.js'


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

  render(){
    return(
      <div>
        {
          this.state.logged_user
          ? <LoggedMain logged_user={this.state.logged_user} />
          : <VisitorMain authUser={this.authUser} authMsg={this.state.authMsg} />
        }
      </div>
    )
  }
}



export default Main
