import React from 'react';
import './styles.css';

export const MovieTable = props => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Genre</th>
                </tr>
            </thead>

            <tbody>
                {props.items}
            </tbody>
        </table>
    )
}