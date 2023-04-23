import React from 'react'
import { toast } from 'react-toastify'
import styled, { css } from 'styled-components'
import { CartIcon, HeartIcon, ZoomIcon } from '../icons'

interface IListHandle {
    handleClickHeart?: () => void
    followed?: boolean
    handleClickAddCart?: () => void
    added?: boolean
    direction?: 'column' | 'row'
}

export const ListHandle = (props: IListHandle) => {
    const { handleClickHeart, followed, handleClickAddCart, added, direction = 'row' } = props
    return (
        <ListHandleStyle followed={followed} added={added} direction={direction}>
            <div className="wrap-radius cart-wrap" onClick={handleClickAddCart}>
                <CartIcon color={added ? 'white' : '#1389FF'} />
            </div>
            <div onClick={handleClickHeart} className="wrap-radius heart-wrap">
                <HeartIcon color={followed ? 'white' : '#1389FF'} />
            </div>
            <div className="wrap-radius zoom-wrap">
                <ZoomIcon color="#1389FF" />
            </div>
        </ListHandleStyle>
    )
}

const ListHandleStyle = styled.div<{
    followed?: boolean
    added?: boolean
    direction?: 'column' | 'row'
}>`
    display: flex;
    gap: 10px;
    ${(p) =>
        p.direction === 'column' &&
        css`
            flex-direction: column;
        `}
    .wrap-radius {
        width: 30px;
        height: 30px;
        padding: 3px;
        border-radius: 50%;
        background-color: #EEEFFB;;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }
    .heart-wrap {
        ${(p) =>
            p.followed &&
            css`
                background-color: var(--primary);
            `}
    }
    .cart-wrap {
        ${(p) =>
            p.added &&
            css`
                background-color: var(--primary);
            `}
    }
`
