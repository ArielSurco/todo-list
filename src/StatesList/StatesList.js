import React from 'react';
import './StatesList.css';

const StatesList = (props) => {
    return (
        <ul className="states-list">
            {props.children}
        </ul>
    )
}

export {StatesList};