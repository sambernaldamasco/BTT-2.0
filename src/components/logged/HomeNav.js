import React from 'react'



class HomeNav extends React.Component{
  render(){
    return (
      <>
        <nav className="navbar is-dark lilrighty" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" className="navbar-menu" >
            <div className="navbar-end">
            <a className="navbar-item" onClick={()=> this.props.mainHandleView(null)}>
              home
            </a>

              <a className="navbar-item" onClick={()=> this.props.mainHandleView('roster')}>
                team
              </a>

              <a className="navbar-item" onClick={()=> this.props.mainHandleView('assessment')}>
                assessment
              </a>

              <a className="navbar-item" onClick={()=> this.props.mainHandleView('practice')}>
                practice

              </a>
            </div>


          </div>
        </nav>
    </>
    )
  }
}

export default HomeNav
