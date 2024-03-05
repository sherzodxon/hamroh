import React from 'react'
import './index.scss'
import { Link, useNavigate } from 'react-router-dom'

function PageControl({next}) {
    const navigate = useNavigate();

    return (
        <div className="page-control">
            <button onClick={() => navigate(-1)} className="page-control__button"></button>
            <Link to={next}  className="page-control__button page-control__button--next"></Link>
        </div>
    )
}

export default PageControl
