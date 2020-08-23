import React from 'react';
import './styles.css';

export const Select = props => {
    return (
        <select value={props.value} onChange={props.onChange} onClick={e => e.preventDefault()}>
            <option disabled value="0">Choose a genre...</option>
            {props.items}
        </select>
    )
}