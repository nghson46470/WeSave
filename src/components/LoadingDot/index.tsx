import React from 'react'
import styled, { css } from 'styled-components'
import { CircleIcon } from '../icons'

export const LoadingDot = () => {
    return (
        <LoadingStyle>
            <div className="loader">
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
            </div>
        </LoadingStyle>
    )
}

const LoadingStyle = styled.div<{}>`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    .loader {
        margin: 0;
        padding: 0;
        width: 40px;
        justify-content: center;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
    .ball {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fa6daa;
        animation: bounce 0.5s alternate infinite;
    }

    .ball:nth-child(2) {
        animation-delay: 0.16s;
    }

    .ball:nth-child(3) {
        animation-delay: 0.32s;
    }

    @keyframes bounce {
        from {
            tranform: scaleX(1.25);
        }
        to {
            transform: translateY(-10px) scaleX(1);
        }
    }
`
