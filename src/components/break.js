import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';

function Break (props) {

    const handleClick = (e) => {
        props.getBreakValue(e.target.value);
        console.log(e.target.value)
    }


    return (
        <div className="child-div">
            <h2 id="break-label">Break Length</h2>
            <div className="child-display-div">
                <button id="break-decrement" value='-' onClick={handleClick}><FontAwesomeIcon icon={faAngleDown} /></button>
                <p id="break-length">{props.breakLength}</p>
                <button id="break-increment" value='+' onClick={handleClick}><FontAwesomeIcon icon={faAngleUp} /></button>
            </div>
        </div>
    );
}

export default Break