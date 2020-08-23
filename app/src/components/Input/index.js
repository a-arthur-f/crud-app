import React from 'react';
import './styles.css';

export const Input = props => {
    return (
        <div className="form-input">
            <input id="movie-name" value={props.value} onChange={props.onChange} placeholder=" "/>
            <label htmlFor="movie-name">Name</label>
        </div>
    )
}