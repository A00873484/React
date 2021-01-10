import React from 'react'

export default function List (props){
    return (
        <ul>
            {props.items.map((item)=>(
                <li key={item.id}>
                    <span 
                        style={{textDecoration: item.complete ? 'line-through' : 'none'}} 
                        onClick={() => props.clicked && props.clicked(item)}>{item.name}</span> 
                    <button onClick={()=>props.delete(item)}>X</button>
                </li>)
            )}
        </ul>
    )
}