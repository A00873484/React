import React from 'react'
import { connect } from 'react-redux'
import { handleAddTodo, handleToggleTodo, handleDeleteTodo } from '../actions/todos'
import List from './List'

class Todos extends React.Component {
    addItem = (e) => {
        e.preventDefault()
        this.props.dispatch(handleAddTodo(this.input.value, ()=>{this.input.value = ""}))
    }

    toggle = (item) => {
        this.props.dispatch(handleToggleTodo(item))
    }

    delete = (item) => {
        this.props.dispatch(handleDeleteTodo(item))
    }

    render(){
        console.log(this.props.todos)
        return (
            <div>
                 <h1>Todo List</h1>
                 <input
                    type='text'
                    placeholder='Add Todo'
                    ref={(input) => this.input = input}
                 />
                 <button onClick={this.addItem}>Add Todo</button>  
                 <List items={this.props.todos} clicked={this.toggle} delete={this.delete}/>
            </div>
        )
    }
}

const ConnectedTodos = connect((state) => ({
    todos: state.todos
}))(Todos)

export default ConnectedTodos