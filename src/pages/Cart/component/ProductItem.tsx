import React, { useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { CloseIcon } from '~/components'
import { config } from '~/config'

interface IProductItem {
    image?: string
    name?: string
    price?: number
    onClickCart?: () => void
    handleIncrement?: () => void
    handleDecrement?: () => void
    amount: number
    handleChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    id: any
}

export const ProductItem = (props: IProductItem) => {
    const { image, name, price, onClickCart, handleDecrement, handleIncrement, amount, handleChange, onBlur, id } =
        props
    const [quantity, setQuantity] = useState<number>(1)
    const [totalPrice, setTotalPrice] = useState<number>()
    const navigate = useNavigate()
    useEffect(() => {
        if (price) {
            setTotalPrice(price * amount)
        }
    }, [amount])

    return (
        <ProductItemStyle>
            <div className="image-container">
                <div
                    className="image-container-sub"
                    onClick={() => navigate(generatePath(config.routes.productDetail, { id: id }))}
                >
                    <img className="image" src={image} alt="" />
                </div>
                <div className="close-wrap" onClick={onClickCart}>
                    <CloseIcon className="close-icon" />
                </div>
                <div
                    className="info-container"
                    onClick={() => navigate(generatePath(config.routes.productDetail, { id: id }))}
                >
                    <h5 className="name" title={name}>
                        {name}
                    </h5>
                    <p className="color">Color:Brown</p>
                    <p className="size">Size:XL</p>
                </div>
            </div>
            <div className="price-container price-text" title={String(price)}>${price}</div>
            <div className="quantity-container">
                <button className="remove-default" onClick={handleDecrement}>
                    -
                </button>
                <input className="input-amount" type="number" value={amount} onBlur={onBlur} onChange={handleChange} />
                <button className=" remove-default" onClick={handleIncrement}>
                    +
                </button>
            </div>
            <div className="total-container price-text" title={String(totalPrice)}>$7</div>
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
        cursor: pointer;
        .image-container-sub {
            width: 80px;
            height: 80px;
            .image {
                border-radius: 3px;
                width: 80px;
                height: 80px;
            }
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
    .quantity-container {
        /* width: 50px; */
        display: flex;
        &:hover {
        }
        .remove-default {
            border: none;
            outline: none;
        }
        button {
            width: 15px;
            font-size: 16x;
            line-height: 20px;
            color: #bebfc2;
            &:hover {
                cursor: pointer;
                color: #2f2f30;
            }
        }
        .input-amount {
            width: 40px;
            text-align: center;
            background-color: #f0eff2;
            font-size: 14px;
            line-height: 20 px;
            /* color: #bebfc2; */
            outline: none;
            border: none;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
    }
    .price-text {
        font-size: 14px;
        line-height: 16px;
        color: #15245e;
        font-weight: 600;
    }
    .total-container {
        display: -webkit-box;
        width: 70px;
        text-align: end;
        -webkit-line-clamp: 1;
        -webkit-box-orient: inline-axis;
        overflow: hidden;
        text-overflow: ellipsis;
        /* max-height: 15px; */
    }
    .name {
        width: 150px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        max-height: 30px;
    }
    .close-wrap {
        position: absolute;
        left: 75px;
        top: -3px;
        cursor: pointer;
        &:hover {
            opacity: 0.6;
        }
    }

`
