import React from "react";
import { FaCheckCircle, FaTimesCircle, FaSyncAlt } from "react-icons/fa";


/**
 * A button component that responds to click.
 * The property clickHandler is a function to be called when the button is clicked.
 * The property states the type of button.
 * 
 */
const Button = ({ clickHandler, variation }) => {

    /**
     * @returns a button type based  on the variation passed to it. Default is Retry button
     */
    const getIcon = (type) => {
        switch (type) {
            case 'correct': return <FaCheckCircle
                style={{ color: "3EDA73", fontSize: "60px", cursor: "pointer" }} />

            case 'wrong': return <FaTimesCircle
                style={{ color: "FC2E2E", fontSize: "60px", cursor: "pointer" }} />

            default:
                return <FaSyncAlt style={{ color: "3EDA73", fontSize: "38px", cursor: "pointer" }} />
        }
    }

    return (
        <div onClick={clickHandler} className='button'>
            {
                getIcon(variation)
            }
        </div>
    )
}

export default Button;