import React from 'react'
import { connect } from 'react-redux'
import { handleReceiveData } from '../actions/share'
import Todos from './Todos'
import Goals from './Goals'

class App extends React.Component {
  componentDidMount () {
      const { dispatch } = this.props
      dispatch(handleReceiveData())
  }
  render(){
      if (this.props.loading === true){
          return <h3>Loading</h3>
      }
      return (
          <div>
              <Todos/>
              <Goals/>
          </div>
      )
  }
}

export default connect((state)=>({
  loading: state.loading
}))(App)
