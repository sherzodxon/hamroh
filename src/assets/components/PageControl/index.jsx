import React from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'

function PageControl({next}) {
    const navigate = useNavigate();

    return (
        <div className="page-control">
            <button onClick={() => navigate(-1)} className="page-control__button"></button>
            <button onClick={() => navigate(next)} className="page-control__button page-control__button--next"></button>
        </div>
    )
}

export default PageControl
