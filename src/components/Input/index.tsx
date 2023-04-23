import React from 'react'
import styled, { css } from 'styled-components'
import {IPropInput} from '~/interfaces'


export const Input = (props: IPropInput) => {
    const { label = '', error = '', className = '', touched = false, radius = '',name='',type='text',value,onBlur,onChange} = props

    
    return (
        <InputStyle className={className} radius={radius}>
            <input className="Input" placeholder={label} name={name} type={type} value={value} onChange={onChange} />
            {error && touched && <div className="error">{error}</div>}
        </InputStyle>
    )
}

const InputStyle = styled.div<{
    radius: string
}>`
    width: 100%;
    height: 50px;
    .Input {
        border-radius: ${(p) => p.radius};
        width: 100%;
        padding: 13px 15px;
        border: 1px solid #c2c5e1;
        outline: none;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
    }
    .error{
        padding: 2px;
        color: red;
        font-size: 12px;
        /* line- */
        /* height: 20px; */
    }
`
