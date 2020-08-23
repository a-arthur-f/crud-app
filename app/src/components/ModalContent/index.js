import React from 'react';
import './styles.css';

export const ModalContent = props => {
    return (
        <div className={`modal-content ${props.active}`}>
            <h2>{props.header}</h2>
            {props.children}
        </div>
    )
}