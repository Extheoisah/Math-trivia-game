import './progressBar.css';

 const  ProgressBar =({time})=> {
    return (
        <div className='progressBar'>
            <div className='indicator' style={{width:`${time}%`}}></div>
            <div className='blob' id='blob'></div>
        </div>

    );
}

export default ProgressBar;