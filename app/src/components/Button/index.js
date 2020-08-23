import React from 'react';
import './styles.css';

export const Button = props => {
    return (
        <div>
            <button className="button" type={props.type} onClick={props.onClick}>{props.label}</button>
        </div>
    )
}