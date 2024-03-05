import React from 'react'
import './index.scss'
function InputSpinner({display,className}) {
    return (
        <div style={display?{display:'block'}:{display:'none'}} className={`input-spinner ${className}`} >
            <span className="input-loader"></span>
        </div>
    )
}

export default InputSpinner
