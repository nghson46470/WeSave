import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Iimage } from '~/interfaces'

interface IPropSearch {
    nameProduct?: string
    priceProduct?: number
    image?: Array<Iimage> | string
    id?: number
    handleClick?: () => void
    type?: 'cart' | 'search'
    amount?: number
}

export const SearchResult = (props: IPropSearch) => {
    const { nameProduct, priceProduct, image, id, handleClick, type = 'search' ,amount} = props
    return (
        <SearchResultStyles onClick={handleClick}>
            <div className="search-img">
                {image && Array.isArray(image) &&
                    image.length > 0 &&
                    image.map((item: Iimage) => {
                        if (item.is_thumbnail) {
                            return <img src={item.image_url} alt="error image" />
                        }
                })}
                {
                   typeof image === 'string' &&  <img src={image} alt="error image" />
                }
            </div>
            <div className="search-description">
                <div className="search-title" title={nameProduct}>{nameProduct}</div>
                <div className="info-wrap d-flex align-center">
                    <div className="search-price">{priceProduct}</div>
                    {type === 'cart' && <div className="search-quantity">x{amount}</div>}
                </div>
            </div>
        </SearchResultStyles>
    )
}
const SearchResultStyles = styled.div<{}>`
    width: 100%;
    display: flex;
    padding: 10px;
    gap: 20px;
    transform: 0.2s;
    &:hover {
        background-color: var(--primary);
        cursor: pointer;
        color: white;
    }
    .search-img {
        width: 50px;
        height: 50px;
        img {
            width: 50px;
            height: 50px;
        }
    }
    .search-description {
    }
    .info-wrap {
        margin: 5px 0px;
        gap: 10px;
    }
    .search-title{
        height: 18px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
