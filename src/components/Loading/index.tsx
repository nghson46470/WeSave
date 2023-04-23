import React from 'react'
import styled, { css } from 'styled-components'

interface IPropsLoanding {
    size ?: string

}

export const Loading = (props:IPropsLoanding) => {
    const { size='40px' } = props
    return (
        <LoadingStyle
            size={size}
        />
    )
}

const LoadingStyle = styled.div<{
    size: string
}>`
    border: 10px solid #f3f3f3;
    margin: 15px;
    border-radius: 50%;
    border-top: 10px solid var(--primary);
    width: ${(p) => p.size};
    height: ${(p) => p.size};
    -webkit-animation: spin 2s linear infinite; /* Safari */
    opacity: 0.5;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`
