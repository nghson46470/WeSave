import React from 'react'
import styled from 'styled-components'

interface IproductItem {
    img?: string
    name?: string
    price?: number
    quantity?: number
}

export const ProductItem = (props:IproductItem) => {
    const {img, name,price,quantity} = props
    return (
        <ProductItemStyle>
            <div className="image-container">
                <img
                    className="image"
                    src={img}
                    alt=""
                />
                <div className="info-container">
                    <h5 className="name" title={name}>
                       {name}
                    </h5>
                    <p className="color">Color:Brown</p>
                    <p className="size">Size:XL</p>
                </div>
            </div>
            <div className="price-container">
                <div className="price-text">${price}</div>
                <div className="price-text quantity-text">x{quantity}</div>
            </div>
        </ProductItemStyle>
    )
}

const ProductItemStyle = styled.div<{}>`
    width: 100%;
    padding: 15px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e4;
    .image-container {
        width: 210px;
        display: flex;
        column-gap: 15px;
        position: relative;
        img {
            border-radius: 3px;
            width: 80px;
            height: 80px;
        }
        .name {
        width: 100px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        max-height: 30px;
    }
    }
    
    .info-container {
        display: flex;
        row-gap: 6px;
        flex-direction: column;
        justify-content: center;
        p {
            font-size: 12px;
            line-height: 14px;
            color: #a1a8c1;
        }
    }
    .price-text {
        font-size: 14px;
        line-height: 16px;
        color: #15245e;
        font-weight: 600;
    }
    .price-container{
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
    .quantity-text{
        opacity: 0.5;
    }
`
