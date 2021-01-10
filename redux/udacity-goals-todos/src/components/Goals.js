import React from 'react'
import { connect } from 'react-redux'
import { handleAddGoal, handleDeleteGoal } from '../actions/goals'

import List from './List'

class Goals extends React.Component {
    addItem = (e) => {
        e.preventDefault()
        this.props.dispatch(handleAddGoal(
            this.input.value,
            () => this.input.value = ""
        ))
    }

    delete = (item) => {
        this.props.dispatch(handleDeleteGoal(item))
    }

    render(){
        console.log(this.props.goals)
        return (
            <div>
                 <h1>Goals</h1>
                 <input
                    type='text'
                    placeholder='Add Goal'
                    ref={(input) => this.input = input}
                 />
                 <button onClick={this.addItem}>Add Goal</button>  
                 <List items={this.props.goals} delete={this.delete}/> 
            </div>
        )
    }
}

const ConnectedGoals = connect((state)=>({
    goals: state.goals
}))(Goals)

export default ConnectedGoals