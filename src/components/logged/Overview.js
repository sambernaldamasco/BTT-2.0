import React from 'react'
import axios from 'axios'


class Overview extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      exceptional: [],
      good: [],
      needsWork: []
    }
  }

  skillOverview = () => {
    const good = []
    const ok = []
    const bad = []

    for (let key in this.props.skater.skill) {
      if (key !== "id" && key !== "skater_id" && key !== "created_at" && key !== "updated_at"  ) {

        switch (true) {
          case this.props.skater.skill[key] >= 4:
            good.push(key.split('_').join(' '))
          break;

          case this.props.skater.skill[key] === 3:
            ok.push(key.split('_').join(' '))
          break;

          default:
            bad.push(key.split('_').join(' '))
          break;
        }
      }
    }

    console.log(good);
    console.log(ok);
    console.log(bad);

  }


  //function to get practice list by the team id


  componentDidMount() {
    //call for practices by team_id
    this.skillOverview()
  }

  render(){
    return(
      <>
        <div>
          <div>
            <h2>exceptional at:</h2>
            <ul>

            </ul>
          </div>

          <div>
            <h2>good at:</h2>
            <ul>

            </ul>
          </div>

          <div>
            <h2>needs work:</h2>
            <ul>

            </ul>
          </div>
        </div>
      </>
    )
  }
}



export default Overview
