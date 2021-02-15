import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';

function Session (props) {
    
    const handleClick = (e) => {
            props.getValue(e.target.value);
            console.log(e.target.value)
    }


    return (
        <div className="child-div">
            <h2 id="session-label">Session Length</h2>
            <div className="child-display-div">
                <button id="session-decrement" value='-' onClick={handleClick}><FontAwesomeIcon icon={faAngleDown} /></button>
                <p id="session-length">{props.sessionLength}</p>
                <button id="session-increment" value='+' onClick={handleClick}><FontAwesomeIcon icon={faAngleUp} /></button>
            </div>
        </div>
    );
}

export default Session