import React from 'react'
import axios from 'axios'


class Overview extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      exceptional: [],
      good: [],
      needsWork: [],
      average: 0
    }
  }

  skillOverview = () => {
    const prettygood = []
    const ok = []
    const bad = []
    let sum = 0
    let count = 0

    for (let key in this.props.skater.skill) {
      if (key !== "id" && key !== "skater_id" && key !== "created_at" && key !== "updated_at"  ) {

        switch (true) {
          case this.props.skater.skill[key] >= 4:
            prettygood.push(key.split('_').join(' '))
          break;

          case this.props.skater.skill[key] === 3:
            ok.push(key.split('_').join(' '))
          break;

          default:
            bad.push(key.split('_').join(' '))
          break;
        }

        sum += this.props.skater.skill[key]
        count++

      }
    }

    this.setState({
      exceptional: prettygood,
      good: ok,
      needsWork: bad,
      average: sum / count
    })

  }


  //function to get practice list by the team id


  componentDidMount() {
    //call for practices by team_id
    this.skillOverview()
  }

  componentDidUpdate(prevProps){
    if (this.props.skater.id !== prevProps.skater.id){
      this.skillOverview()
    }
  }


  render(){
    return(
      <>
        <div>
          <div>
            <h2>exceptional at:</h2>
            <ul>
              {this.state.exceptional.map(skill => {
                return (
                  <li>{skill}</li>
                )
              })}
            </ul>
          </div>

          <div>
            <h2>good at:</h2>
            <ul>
            {this.state.good.map(skill => {
              return (
                <li>{skill}</li>
              )
            })}
            </ul>
          </div>

          <div>
            <h2>needs work:</h2>
            <ul>
            {this.state.needsWork.map(skill => {
              return (
                <li>{skill}</li>
              )
            })}
            </ul>
          </div>
        </div>

        {
          this.props.skater.accepted
          ?
            <div>
              <h3>attendance</h3>
              <ul>
              {this.props.skater.practices.map(practice => {
                return <li key={practice.id}>{practice.date} @ {practice.location}</li>
              })}
              </ul>
            </div>
          :
            <div>
            {
              this.props.skater.veteran || this.state.average >= 3
              ? <button onClick={this.props.acceptSkater}>accept skater</button>
              : null
            }

            <button onClick={this.props.dismissSkater}>dismiss skater</button>
            </div>
        }

      </>
    )
  }
}



export default Overview
