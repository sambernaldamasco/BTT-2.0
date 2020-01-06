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


  componentDidMount() {
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
          <h2 className="title-change is-size-2">{this.props.skater.name.toUpperCase()}</h2>
          <br/>

          <h2 className="title-change is-size-3">skills overview</h2>
          <br/>
          <div className="columns">
            <div className="column overview-column">
              <h2 className="exceptional is-size-4">exceptional at:</h2>
              <ul>
                {this.state.exceptional.map(skill => {
                  return (
                    <li>{skill}</li>
                  )
                })}
              </ul>
            </div>

            <div className="column overview-column">
              <h2 className="good is-size-4">good at:</h2>
              <ul>
              {this.state.good.map(skill => {
                return (
                  <li>{skill}</li>
                )
              })}
              </ul>
            </div>

            <div className="column">
              <h2 className="needswork is-size-4">needs work:</h2>
              <ul>
              {this.state.needsWork.map(skill => {
                return (
                  <li>{skill}</li>
                )
              })}
              </ul>
            </div>
          </div>
        </div>

        <br/>
        <hr className="break"/>

        {
          this.props.skater.accepted
          ?
            <div>
              <h2 className="title-change is-size-3">attendance</h2>
              <h2 className="is-size-4"> skater attended {(this.props.practiceCount - (this.props.skater.practices.length - 1))*100}% of practices</h2>

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
              ? <button className="button is-primary" onClick={this.props.acceptSkater}>accept skater</button>
              : null
            }

            <button className="button is-warning is-outlined" onClick={this.props.dismissSkater}>dismiss skater</button>
            </div>
        }

      </>
    )
  }
}



export default Overview
