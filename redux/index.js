function generateId(){
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
}

//Library Code
function createStore(reducer){
    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        let res = reducer(state, action)
        if(res != state){  
            state = res
            listeners.forEach((l)=>l())
        }
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

//App Code
const ADD_TODO = 'ADD_TODO', REMOVE_TODO = 'REMOVE_TODO', TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL', REMOVE_GOAL = 'REMOVE_GOAL'

function addTodoAction (todo) {
    return {
    type: ADD_TODO,
    todo,
    }
}

function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

function toDos(state = [], action){
    switch(action.type) {
        case ADD_TODO :
            return state.concat([action.todo])
        case REMOVE_TODO :
            return state.filter((todo)=>todo.id !== action.id)
        case TOGGLE_TODO :
            return state.map((todo)=>todo.id !== action.id ? todo : 
                Object.assign({}, todo, { complete: !todo.complete }))
        default :
            return state
    }
}

function goals (state = [], action) {
    switch(action.type) {
        case ADD_GOAL :
            return state.concat([action.goal])
        case REMOVE_GOAL :
            return state.filter((goal)=>goal.id !== action.id)
        default :
            return state
    }
}

function root (state = {}, action){
    return state = {
        toDos: toDos(state.toDos, action),
        goals: goals(state.goals, action)
    }
}

const store = createStore(root)

store.subscribe(() => {
    const { goals, toDos } = store.getState()

    document.getElementById('goals').innerHTML = ''
    document.getElementById('todos').innerHTML = ''

    goals.forEach(addGoalToDOM)
    toDos.forEach(addTodoToDOM)
})

// DOM code

function addTodo(){
    const input = document.getElementById('todo')
    const name = input.value
    input.value = ''

    store.dispatch(addTodoAction({
        id: generateId(),
        name,
        complete: false,
    }))
}

function addGoal(){
    const input = document.getElementById('goal')
    const name = input.value
    input.value = ''

    store.dispatch(addGoalAction({
        name,
        id: generateId()
    }))
}

document.getElementById('todoBtn').addEventListener('click', addTodo)
document.getElementById('goalBtn').addEventListener('click', addGoal)

function createRemoveButton(onClick) {
    const button = document.createElement('button')
    button.innerHTML = 'X'
    button.addEventListener('click', onClick)
    return button
}

function addTodoToDOM(todo){
    const node = document.createElement('li')
    const text = document.createTextNode(todo.name)

    const button = createRemoveButton(()=>{
        store.dispatch(removeTodoAction(todo.id))
    })

    node.appendChild(text)
    node.appendChild(button)
    node.style.textDecoration = todo.complete?'line-through':'none'
    node.addEventListener('click', () => {
        store.dispatch(toggleTodoAction(todo.id))
    })
    
    document.getElementById('todos').appendChild(node)
}

function addGoalToDOM(goal){
    const node = document.createElement('li')
    const text = document.createTextNode(goal.name)

    const button = createRemoveButton(()=>{
        store.dispatch(removeGoalAction(goal.id))
    })

    node.appendChild(text)
    node.appendChild(button)
    document.getElementById('goals').appendChild(node)
}