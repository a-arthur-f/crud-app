import React from 'react';
import './styles.css';

export const Modal = props => {
    return (
        <div className={`modal ${props.active}`} onClick={(e) => {
            if(e.target.className === 'modal active')
                props.displayModal(); 
        }}>
           {props.children}
        </div>
    )
}