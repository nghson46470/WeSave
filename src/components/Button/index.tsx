import React, { Fragment, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { SearchIcon } from '~/components'
import { useMediaQuery } from '../../Hook'
import { IButton } from '~/interfaces'

export const Button = (props: IButton) => {
    const {
        className,
        onClick,
        disabled = false,
        btnColor = 'var(--primary)',
        text = 'Sign In',
        style,
        children,
        btnWidth = '50px',
        btnHeight = '50px',
        Icon = 'normal',
        radius = '0px',
        padding = '0px 40px',
        font = 'jose',
        onKeyDown
    } = props
    const isMobile = useMediaQuery('(max-width: 768px)')

    // useEffect(() => {
    //     if (Icon === 'normal') {
    //         classBtn.current = 'btn-normal'
    //     } else if (Icon === 'search') {
    //         classBtn.current = 'btn-Search'
    //     } else {
    //         classBtn.current = 'btn-dot'
    //     }
    // })

    return (
        <ButtonStyled
            disabled={disabled}
            style={style}
            className={className ? `btn ${className}` : 'btn'}
            isMobilea={isMobile}
            onClick={onClick}
            width={btnWidth}
            height={btnHeight}
            btnColor={btnColor}
            Icon={Icon}
            radius={radius}
            padding={padding}
            font={font}
            onKeyDown={()=>onKeyDown}
        >
            {Icon === 'search' && (
                <button className="btn-Search">
                    <SearchIcon />
                </button>
            )}

            {Icon === 'dot' && <button className="btn-dot"></button>}

            {Icon === 'normal' && <button className="btn-normal">{text}</button>}
        </ButtonStyled>
    )
}

export const ButtonStyled = styled.div<{
    isMobilea: boolean
    width: string
    height: string
    btnColor: string
    disabled: boolean
    Icon: 'normal' | 'dot' | 'search'
    radius: string
    padding: string
    font: 'Philosopher' | 'jose'
}>`
    width: ${(p) => p.width};
    .btn-dot {
        width: 10px;
        height: 10px;
        transform: rotateZ(45deg);
    }
    .btn-Search {
        background-color: ${(p) => p.btnColor};
        width: fit-content;
        min-width: 50px;
        min-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn-normal {
        width: ${(p) => p.width};
        padding: ${(p) => p.padding};
        font-family: ${(p) => p.font}, sans-serif;
        border-radius: ${(p) => p.radius};
        font-weight: 600;
        font-size: 14px;
        line-height: 26px;
        border: none !important;
        ${(p) =>p.disabled && css`
            background-color: #464646;
            opacity: 0.3;
            cursor: default;
        `}
    }
    button {
        background-color: ${(p) => p.btnColor};
        border: 1px solid var(--primary);
        cursor: pointer;
        color: white;
        transition: 0.2s;
        ${(p) =>p.disabled===false && css`
            &:hover {
                opacity: 0.7;
            }
        `}
    }
`
