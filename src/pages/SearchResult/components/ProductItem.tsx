import React from 'react'
import styled, { css, CSSProperties } from 'styled-components'
import { CartIcon, CircleIcon, HeartIcon, VoteIcon, ZoomIcon } from '~/components'
import { Iimage } from '~/interfaces'

interface IProductItem {
    style?: CSSProperties
    images?: Array<Iimage>
    title: string
    description: string
    price?: number
    discount: number
    handleClickHeart: () => void
    followed: boolean
    onClick?: () => void
    addCart: boolean
    handleClickCart: () => void
    isShop?: boolean
    nameShop?: string
    addressShop?: string
    phoneShop?: string
    stars?:string
}

export const ProductItem = (props: IProductItem) => {
    const {
        images,
        title,
        price = 0,
        discount,
        handleClickHeart,
        followed,
        isShop = false,
        onClick,
        addCart,
        handleClickCart,
        nameShop,
        addressShop,
        phoneShop,
        stars
    } = props
    const pirceDiscount = (price / 100) * (100 - discount)
    return (
        <ProductItemStyle followed={followed} addCart={addCart}>
            <div className="content-product-container d-flex">
                <div className="img-content-product" onClick={onClick}>
                    {images &&
                        images.length > 0 &&
                        // eslint-disable-next-line array-callback-return
                        images.map((image: Iimage, index) => {
                            if (image.is_thumbnail) {
                                return (
                                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                    <img key={index} src={image.image_url} alt="error image" />
                                )
                            }
                        })}
                </div>
                <div className="text-content-container d-flex ">
                    <div className="title-wrap d-flex" onClick={onClick}>
                        <div className="title-content" title={title}>
                            {title}
                        </div>
                        <div className="ellipse-wrap d-flex">
                            <CircleIcon color="var(--black-gold)" />
                            <CircleIcon color="var(--primary)" />
                            <CircleIcon />
                        </div>
                    </div>
                    <div className="price-container d-flex">
                        {pirceDiscount !== 0 && (
                            <>
                                <div className="current-price">${pirceDiscount}</div>
                                <div className="prev-price">${price}</div>
                            </>
                        )}
                        <div className="vote-wrap">
                            <VoteIcon color="var(--gold)" />
                            <VoteIcon color="var(--gold)" />
                            <VoteIcon color="var(--gold)" />
                            <VoteIcon color="var(--gold)" />
                            <VoteIcon color={stars && "var(--gold)" } />
                        </div>
                    </div>
                    {/* <div className="description" onClick={onClick} title={description}>
                        {description}
                    </div> */}
                    <div onClick={onClick} title={nameShop}>
                        {nameShop}
                    </div>
                    <div onClick={onClick} title={phoneShop}>
                        {phoneShop}
                    </div>
                    <div onClick={onClick} title={addressShop}>
                        {addressShop}
                    </div>
                    {!isShop && (
                        <div className="icon-container d-flex">
                            <div className="icon-item-wrap cart-icon" onClick={handleClickCart}>
                                <CartIcon
                                    color={addCart ? 'white' : 'var(--dark-blue)'}
                                    width="16px"
                                    height="16px"
                                    className="icon-item"
                                />
                            </div>
                            <div className="icon-item-wrap heart-icon" onClick={handleClickHeart}>
                                <HeartIcon
                                    color={followed ? 'white' : 'var(--dark-blue)'}
                                    width="16px"
                                    height="16px"
                                    className="icon-item"
                                />
                            </div>
                            <div className="icon-item-wrap">
                                <ZoomIcon color="var(--dark-blue)" width="16px" height="16px" className="icon-item" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ProductItemStyle>
    )
}

const ProductItemStyle = styled.div<{
    followed: boolean
    addCart: boolean
}>`
    width: 70%;
    max-width: 1140px;
    box-shadow: 0px 0px 25px 5px rgba(189, 189, 189, 0.141);
    transition: 0.2s;
    /* border: 2.5px solid rgba(209, 208, 208, 0.273); */
    &:hover {
        box-shadow: 0px 0px 25px 5px rgba(180, 179, 179, 0.5);
        cursor: pointer;
    }
    .content-product-container {
        padding: 18px 20px;
        gap: 32px;
    }
    .img-content-product {
        img {
            width: 200px;
            height: 200px;
        }
    }
    .text-content-container {
        flex-direction: column;
        justify-content: center;
        gap: 14px;
        flex-grow: 1;
        .title-content {
            color: var(--dark-blue);
            font-size: 19.8783px;
            line-height: 23px;
            font-weight: 700;
            width: 250px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .title-wrap {
            gap: 18px;
            align-items: center;
            .ellipse-wrap {
                gap: 6px;
            }
        }
        .price-container {
            align-items: center;
            gap: 10px;
            .current-price {
                color: var(--dark-blue);
            }
            .prev-price {
                color: var(--primary);
                text-decoration: line-through;
            }
        }
        .description {
            display: -webkit-box;
            color: var(--grey);
            height: 76px;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            width: 100%;
        }
        .icon-container {
            align-items: center;
            gap: 20px;
            .icon-item-wrap {
                width: 34px;
                height: 34px;
                background-color: white;
                box-shadow: 0px 0px 27.6087px rgba(0, 0, 0, 0.05);
                border-radius: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover {
                    background-color: var(--grey);
                    cursor: pointer;
                }
            }
            .heart-icon {
                ${(p) =>
                    p.followed &&
                    css`
                        background-color: var(--primary);
                    `}
            }
            .cart-icon {
                ${(p) =>
                    p.addCart &&
                    css`
                        background-color: var(--primary);
                    `}
            }
        }
    }
`
