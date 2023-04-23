import React from 'react'
import styled, { css } from 'styled-components'
import { ArrowTopIcon } from '~/components'

interface IScrollTop {
    scrollTop?: boolean
    onClick?: () => void
}

export const ScrollTop = (props: IScrollTop) => {
    const { scrollTop = false, onClick } = props
    return (
        <ScrollTopStyle onClick={onClick} scrollTop={scrollTop}>
            <ArrowTopIcon width={16} height={10}/>
        </ScrollTopStyle>
    )
}

const ScrollTopStyle = styled.div<{
    scrollTop: boolean
}>`
    background-color: #ffffff;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 70vh;
    right: 5vh;
    display: none;
    opacity: 0.6;
    transition: 0.4;
    box-shadow: 0px 8px 40px rgba(43, 41, 49, 0.179);
    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
    ${(p)=>p.scrollTop && css`
        display: flex;
    `}
`
