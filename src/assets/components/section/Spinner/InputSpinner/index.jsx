import React from 'react'
import './index.scss'
function InputSpinner({display}) {
    return (
        <div style={display?{display:'block'}:{display:'none'}} className="input-spinner">
            <span className="input-loader"></span>
        </div>
    )
}

export default InputSpinner
