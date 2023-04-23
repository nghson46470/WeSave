import React from 'react'
import styled, { css } from 'styled-components'
import { IPropInput } from '~/interfaces'

export const Input = (props: IPropInput) => {
    const {
        label = '',
        error = '',
        className = '',
        touched = false,
        radius = '',
        name = '',
        type = 'text',
        value,
        onBlur,
        onChange,
        id = '',
    } = props

    return (
        <InputStyle className={className}>
            <input
                id={id}
                className="input"
                placeholder={label}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
            {error && touched && <div className="error">{error}</div>}
        </InputStyle>
    )
}

const InputStyle = styled.div<{}>`
    width: 100%;
    height: 40px;
    position: relative;
    margin-bottom: 23px;

    .input {
        /* padding: 13px 0px; */
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        outline: none;
        padding-top: 21px;
        border-bottom: 2px solid #bfc6e0;
        ::placeholder {
            color: #f8f8fd;
            opacity: 0;
        }
        &:focus + label,
        &:not(:placeholder-shown) + label {
            top: 0;
            transform: translateY(0);
        }
    }
    label {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(calc(-50% + 8px));
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
        color: #c1c8e1;
        transition: 200ms;
        cursor: text;
    }
    .error {
        color: red;
        font-size: 11px;
        margin-top: 5px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type='number'] {
        -moz-appearance: textfield;
    }
`
