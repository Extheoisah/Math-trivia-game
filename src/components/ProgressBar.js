import React from 'react';
import {useRef,useEffect} from 'react';
import './progressBar.css';

/**
 * A component that displays the progress or time left for game.
 */
 const  ProgressBar =({setTimer})=> {
    const timerRef = useRef();

    useEffect(()=>{
        setTimer(timerRef);
    });

    return (
        <div className='progressBar'>
            <div ref={timerRef} className='indicator'></div>
            <div className='blob' id='blob'></div>
        </div>

    );
}

export default ProgressBar;