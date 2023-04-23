import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { CheckIcon } from 'src/components/icons'
import { decrement, deleteProduct, getUnpaidCart, increment, updateUnpaidCart, changeValue } from 'src/redux/slices'
import styled, { css } from 'styled-components'
import { productApi } from '~/api'
import { Button, HeadingPage, Loading } from '~/components'
import { config } from '~/config'
import { useDebounce } from '~/Hook'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import { ProductItem } from './component/ProductItem'
import { listCart } from 'src/components/fake-data/list-clothes'

interface IProductItem {
    thumbnail_url?: string
    name?: string
    price?: number
    id: number
    amount: number
}

export const Cart = () => {
    const loading = useAppSelector((state) => state.cart.loading)
    const carts = useAppSelector((state) => state.cart)
    const products = carts.products
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const breadcrumb = [
        {
            name: 'Home',
            path: config.routes.home,
        },
        {
            name: 'page',
            path: config.routes.Page404,
        },
        {
            name: 'shopping curt',
            path: config.routes.cart,
        },
    ]

    const handleUpdate = () => {
        const products = carts.products.map((product: IProductItem) => ({ id: product.id, amount: product.amount }))
        dispatch(updateUnpaidCart({ id: carts.id, products }))
    }

    useDebounce(
        handleUpdate,
        [carts.products],
        500
    )

    const onClickDeleteCart = (id: number | string) => {
        dispatch(deleteProduct(id))
    }

    const handleIncrement = (id: number | string) => {
        dispatch(increment(id))
    }

    const handleDecrement = (id: number | string) => {
        dispatch(decrement(id))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number | string) => {
        const value = Number(e.target.value)
        const payload = {
            value: value,
            id: id,
        }
        dispatch(changeValue(payload))
    }

    const handleBlur = (id: number | string, amount: number) => {
        if (!amount) {
            // const payload = {
            //     value: 1,
            //     id: id,
            // }
            // dispatch(changeValue(payload))
            
            dispatch(deleteProduct(id))
        }
        if(amount>20){
            toast.error('You can only buy 20 products',{ autoClose:1500})
            const payload = {
                value: 20,
                id: id,
            }
            dispatch(changeValue(payload))
        }
    }

    // useEffect (()=>{
    //     if(product.amount>=20){
    //         toast.error('cannot exceed 20 products',{ autoClose:1500})
    //         const payload = {
    //             value: 20,
    //             id: id,
    //         }
    //         dispatch(changeValue(payload))
    //     }
    // },[])

    const handleDisabled = () => {
        return
    }


    return (
        <div>
            <HeadingPage title="shopping curt" breadCrumbs={breadcrumb} />
            <CartStyle>
                <div className="container-cart max-width">
                    <div className="products-container">
                        <div className="title-container d-flex">
                            <h4 className="product-text">Product</h4>
                            <h4 className='item-title' >Price</h4>
                            <h4 className='item-title' >Quantity</h4>
                            <h4 className='item-title' >Total</h4>
                        </div>
                        {listCart &&
                            listCart.length > 0 &&
                            listCart.map((product: any,index) => {
                                return (
                                    <ProductItem
                                        key={index}
                                        name={product?.name}
                                        price={product?.price}
                                        image={product?.thumbnail_url}
                                        onClickCart={() => onClickDeleteCart(product.id)}
                                        handleIncrement={() => handleIncrement(product.id)}
                                        handleDecrement={() => handleDecrement(product.id)}
                                        amount={product?.amount}
                                        handleChange={(e) => handleChange(e, product.id)}
                                        onBlur={() => handleBlur(product.id, product?.amount)}
                                        id={product.id}
                                    />
                                )
                            })}
                        {listCart.length === 0 && (
                            <div className="not-product">Not products, please add more products to cart...</div>
                        )}
                    </div>
                    <div className="total-cart-container">
                        <h4>Cart Totals</h4>
                        <div className="payment-form">
                            <div className="subtotal-wrap d-flex">
                                <div className="title">Subtotals:</div>
                                <p>${carts.subTotal}</p>
                            </div>
                            <div className="total-wrap d-flex">
                                <div className="title">totals:</div>
                                <p>${carts.total}</p>
                            </div>
                            <div className="shipping-wrap d-flex align-center">
                                <CheckIcon />
                                <p>Shipping & taxes calculated at checkout</p>
                            </div>
                            <Button
                                onClick={products.length === 0 ? handleDisabled : () => navigate(config.routes.payment)}
                                text="Proceed To Checkout"
                                btnWidth="100%"
                                padding="12px "
                                radius="3px"
                                style={{ border: 'none' }}
                                btnColor="#19D16F"
                                disabled={products.length === 0 ? true : false}
                            />
                        </div>
                    </div>
                </div>
                {loading && (
                    <div className="loading-wrap">
                        <Loading size="80px" />
                    </div>
                )}
            <ToastContainer/>
            </CartStyle>
        </div>
    )
}

const CartStyle = styled.div<{}>`
    margin: 200px 0px;
    display: flex;
    width: 100%;
    justify-content: center;
    color: var(--blue);
    width: 100%;
    .container-cart {
        /* background-color: aliceblue; */
        width: 1140px;

        /* height: 100px; */
        display: flex;
        gap: 80px;
        .products-container {
            width: 60%;
            /* height: 700px; */
            /* overflow-y: auto; */
        }
    }
    .title-container {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 48px;
        .product-text {
            width: 200px;
        }
        .item-title{
            width: 70px;
            text-align: center;
        }
    }
    .total-cart-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        h4 {
            margin-bottom: 48px;
        }
        .payment-form {
            width: 100%;
            background-color: #f4f4fc;
            padding: 32px 23px;
            display: flex;
            flex-direction: column;
            row-gap: 35px;
            border-radius: 5px;
            .subtotal-wrap,
            .total-wrap {
                justify-content: space-between;
                padding-bottom: 13px;
                border-bottom: 2px solid #e8e6f1;
            }
            .shipping-wrap {
                column-gap: 7px;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: #8a91ab;
            }
        }
    }
    .title {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        p {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
        }
    }
    .loading-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0px;
        position: fixed;
        width: 100%;
        height: 100%;
        background: #00000041;
        /* opacity: 0.5; */
    }
    .not-product {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        margin-top: 150px;
    }
`
