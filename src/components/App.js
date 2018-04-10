import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import SignUp from './SignUp'

class App extends Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={SignUp}/>
        </div>
      </div>
    )
  }
}

export default App