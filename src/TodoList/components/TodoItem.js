import React from 'react';

const TodoItem = (props) => {
    return (
        <li className={props.className}>
            <input type="checkbox" checked={props.completed} onChange={props.onComplete} />
            {props.text}
            <i className="todo-item__trash" onClick={props.onDelete}></i>
        </li>
    )
}

export { TodoItem };