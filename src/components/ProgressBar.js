import {useRef,useEffect} from 'react';

import './progressBar.css';

 const  ProgressBar =({setTimer})=> {
    // const time = useRef(100);
    // const animId = useRef();
    // const count = useRef(0);
    const timerRef = useRef();

    // const animate = ()=>{
    //     count.current++;

    //     if(count.current%5===0){
    //         time.current--;
    //         timerRef.current.style.width = `${time.current}%`
    //     }

    //     animId.current = requestAnimationFrame(animate);
    // }

    // useEffect(() => {
    //     animate()
    //     return () => {
    //         cancelAnimationFrame(animId.curent);
    //     }
    // }, []);

    useEffect(()=>{
        setTimer(timerRef);
    })

    return (
        <div className='progressBar'>
            <div ref={timerRef} className='indicator'></div>
            <div className='blob' id='blob'></div>
        </div>

    );
}

export default ProgressBar;