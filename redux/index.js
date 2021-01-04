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
function toDos(state = [], action){
    if (action.type === "ADD_TODO") {
        return state.concat([action.todo])
    }
    return state
}