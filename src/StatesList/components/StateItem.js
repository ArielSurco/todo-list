import React from 'react';

const StateItem = (props) => {
    return (
        <li className={`states-list__state` + props.selected} onClick={props.onSelect}>
            {props.state}
        </li>
    )
}

export {StateItem};