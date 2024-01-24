import React from 'react'
import './index.scss'
import FormSection from '../../assets/components/section/FormSection'
function RegistrationPage() {
    return (
        <div className="registration">
            <div className="registration__form-wrapper">
                <FormSection className="registration__from" maxWidth={500} buttonTitle="Kirish"/>
            </div>
        </div>
    )
}

export default RegistrationPage
