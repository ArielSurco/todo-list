import React from 'react';
import './TodoList.css';

const TodoList = (props) => {

    return (
        <ul className="todo-list">
            {props.children}
        </ul>
    )
}

export {TodoList};