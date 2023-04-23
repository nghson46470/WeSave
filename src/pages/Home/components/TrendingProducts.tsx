import React from 'react'
import styled, { css } from 'styled-components'

interface IpropProducts {
    name: string
    price: number
    images: Iimage[]
    discount: number
    followed: boolean
    description?: string
}

interface Iimage {
    image_url: string
    is_thumbnail: boolean
}

export const TrendingProducts = (props: IpropProducts) => {
    const { name, images, price, followed, discount } = props

    const discountedPrice = discount ? price * (1 - discount / 100) : price

    return (
        <TrendingProductsStyle>
            <div className="container-main">
                <div className="image-container">
                    {images &&
                        images.length > 0 &&
                        images.map((image: Iimage,index) => {
                            if (image.is_thumbnail) {
                                return <img key={index} className='img' src={image.image_url} alt="" />
                            }
                        })}{' '}
                </div>
                <div className="title-container">
                    <div className="name-wrap" title={name}>{name}</div>
                    <div className="price-wrap">
                        <div className="price-curren">${discountedPrice}</div>
                        <div className="price-prev">${price}</div>
                    </div>
                </div>
            </div>
        </TrendingProductsStyle>
    )
}

const TrendingProductsStyle = styled.div<{}>`
    width: 270px;
    height: 350px;
    display: inline-block;
    position: relative;
    background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
    box-shadow: 0px 8px 40px rgba(50, 32, 138, 0.167);
    &:hover {
        cursor: pointer;
        box-shadow: 0px 8px 40px rgba(26, 17, 75, 0.248);
    }
    .container-main {
        position: absolute;
        top: 10px;
        bottom: 10px;
        right: 10px;
        left: 10px;
        background-color: white;
        .image-container {
            width: 100%;
            height: 244px;
            background-color: #F5F6F8;
            .img{
                width: 100%;
                height: 100%;
            }
        }
        .title-container {
            margin-top: 15px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            color: var(--blue);
            .name-wrap {
                font-weight: 700;
                font-size: 16px;
                line-height: 26px;
                text-align: center;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
            }
            .price-wrap {
                display: flex;
                justify-content: center;
                gap: 12px;
                font-size: 14px;
                line-height: 16px;
                text-align: center;
                font-weight: 550;
                .price-prev {
                    color: var(--grey);
                    text-decoration: line-through;
                }
            }
        }
    }
`
