import React from 'react';
import './styles.css';

export const MovieItem = props => {
    return (
        <tr>
            <td>{props.movie['movie_name']}</td>
            <td>{props.movie.genre}</td>
            <td className="edit">
                <button 
                    onClick={() => props.edit(props.movie.id)}
                >
                    Edit
                </button>
            </td>
            <td className="delete">
                <button 
                    onClick={() => props.delete(props.movie.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}