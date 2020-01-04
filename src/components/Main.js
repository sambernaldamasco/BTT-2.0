import React from 'react'
import axios from 'axios'
import LoggedMain from './logged/LoggedMain.js'
import VisitorMain from './visitor/VisitorMain.js'


class Main extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        logged_user: null,
        authMsg: null
    }
  }


  authUser = (formData) => {
    axios.post('http://btt-backend.herokuapp.com/sessions', formData)
    .then(response => {
      console.log(response.data)
      response.data.id ? this.setState({logged_user: response.data, authMsg:null}) : this.setState({authMsg: 'invalid username or password'})
    })
    .catch(error => console.log(error))
  }


  // componentDidMount() {
  //   this.getTeams()
  // }

  render(){
    return(
      <div>
        {
          this.state.logged_user
          ? <LoggedMain authUser={this.authUser} authMsg={this.authMsg}/>
          : <VisitorMain />
        }
      </div>
    )
  }
}



export default Main
