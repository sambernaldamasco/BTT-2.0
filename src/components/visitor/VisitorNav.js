import React from 'react'



class VisitorNav extends React.Component{
  render(){
    return (
      <>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" className="navbar-menu" >
            <div className="navbar-start">
            <a className="navbar-item" onClick={()=> this.props.mainHandleView(null)}>
              home
            </a>

              <a className="navbar-item" onClick={()=> this.props.mainHandleView('register')}>
                register team
              </a>

              <a className="navbar-item" onClick={()=> this.props.mainHandleView('sign in')}>
                sign in
              </a>

              <a className="navbar-item" onClick={()=> this.props.mainHandleView('sign up')}>
                sign up
              </a>
            </div>


          </div>
        </nav>
    </>
    )
  }
}

export default VisitorNav
