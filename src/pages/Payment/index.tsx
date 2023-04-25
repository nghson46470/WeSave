import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { ProductItem } from './component/ProductItem'
import { Button, HeadingPage, Loading } from '~/components'
import { config } from '~/config'
import { CheckIcon } from 'src/components/icons'
import { Input } from './component/Input'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import { orderApi } from '~/api'
import { clearCart } from 'src/redux/slices'
import { toast, ToastContainer } from 'react-toastify'
import { listCart } from 'src/components/fake-data/list-clothes'

interface IproductItem {
    thumbnail_url?: string
    name?: string
    price?: number
    amount?: number
}

interface IinitValue {
    contact: string
    first_name: string
    last_name: string
    address: string
    description: string
    city: string
    postal_code: string
}

export const Payment = () => {
    const [disable, setDisable] = useState(true)
    const navigate = useNavigate()
    const state = useAppSelector((state) => state.cart)
    const products = state.products
    const idCart = state.id

    const dispatch = useAppDispatch()

    const initialValues = {
        contact: '',
        first_name: '',
        last_name: '',
        address: '',
        description: '',
        city: '',
        postal_code: '',
    }

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
            name: 'Payment',
            path: config.routes.payment,
        },
    ]

    const paymentValidate = yup.object().shape({
        contact: yup
            .string()
            .required('Email is required.')
            .max(30, 'Max length is 30 characters.')
            .test({
                name: 'Validate email or phone',
                message: 'Contact must be email or phone.',
                test: (value: any) => {
                    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || /^0[0-9]{9}$/.test(value)
                },
            }),
        last_name: yup.string().required('Last name is required.').max(30, 'Max length is 30 characters.'),
        first_name: yup.string().required('Frist Name required.').max(30, 'Max length is 30 characters.'),
        address: yup.string().required('address is required.').max(30, 'Max length is 30 characters.'),
        description: yup.string().required('Description is required.').max(30, 'Max length is 30 characters.'),
        city: yup.string().required('City is required.').max(30, 'Max length is 30 characters.'),
        postal_code: yup.string().required('Postal code is required.').max(30, 'Max length is 30 characters.'),
    })

    const { values, touched, handleChange, handleBlur, handleSubmit, errors, resetForm, isSubmitting, setSubmitting } =
        useFormik({
            initialValues,
            onSubmit: async (values) => {
                try {
                    const body = {
                        cart_id: idCart,
                        shipping_info: values,
                    }
                    await orderApi.createOrder(body)
                    toast.success('Order completed', { autoClose: 2000 })
                    dispatch(clearCart())
                    navigate(config.routes.oderCompleted)
                    setSubmitting(false)
                    setTimeout(() => {}, 1000)
                } catch (error: any) {
                    toast.error(error.message)
                    setSubmitting(false)
                }
            },
            validationSchema: paymentValidate,
        })

    useEffect(() => {
        if (
            values.contact &&
            values.first_name &&
            values.last_name &&
            values.address &&
            values.description &&
            values.city &&
            values.postal_code
        ) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [values])

    const handleDisabled = () => {}

    return (
        <div>
            <HeadingPage title="Payment" breadCrumbs={breadcrumb} />
            <PaymentStyle>
                <div className="container-product max-width">
                    <div className="contact-Information">
                        <div className="contact-Information-sub">
                            <div className="contact-info">
                                <p className="text-title">Contact Information</p>
                                <Input
                                    label="Email or mobile phone number"
                                    id="email"
                                    name="contact"
                                    value={values.contact}
                                    onChange={handleChange}
                                    touched={touched.contact}
                                    error={errors.contact}
                                />
                            </div>
                            <div className="shipping-address">
                                <p className="text-title">Shipping address</p>
                                <div className="name-input width-100">
                                    <Input
                                        label="First name"
                                        id="first-name"
                                        name="first_name"
                                        value={values.first_name}
                                        onChange={handleChange}
                                        touched={touched.first_name}
                                        error={errors.first_name}
                                    />
                                    <Input
                                        label="Last name"
                                        id="last name"
                                        name="last_name"
                                        value={values.last_name}
                                        onChange={handleChange}
                                        touched={touched.last_name}
                                        error={errors.last_name}
                                    />
                                </div>
                                <Input
                                    label="Address"
                                    id="address"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    touched={touched.address}
                                    error={errors.address}
                                />
                                <Input
                                    label="Apartment, suit, e.t.c (optinal)"
                                    id="address-main"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    touched={touched.description}
                                    error={errors.description}
                                />
                                <Input
                                    label="City"
                                    id="city"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    touched={touched.city}
                                    error={errors.city}
                                />
                                <Input
                                    label="Postal Code"
                                    id="code"
                                    name="postal_code"
                                    type="number"
                                    value={values.postal_code}
                                    onChange={handleChange}
                                    touched={touched.postal_code}
                                    error={errors.postal_code}
                                />
                            </div>
                            <div className="payment-type">
                                <h4>Choose payment method below</h4>
                                <div className="types d-flex justify-space-between">
                                    <div className="type ">
                                        <div className="text method-card selected">
                                            <p>Pay with Credit Card</p>
                                            {
                                                // eslint-disable-next-line jsx-a11y/alt-text
                                                <img
                                                    style={{ width: '100px', objectFit: 'cover' }}
                                                    src="https://support.moqups.com/hc/article_attachments/115010765209/02._Your_Account_-_Logos_.jpg"
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="type">
                                        <div className="text method-card">
                                            <p>Pay with PayPal</p>
                                            {
                                                // eslint-disable-next-line jsx-a11y/alt-text
                                                <img
                                                    style={{ width: '100px', objectFit: 'cover' }}
                                                    src="https://tap2pay.me/wp-content/uploads/2018/12/PayPal-Header-720x480-1.jpg"
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="type">
                                        <div className="text method-card">
                                            <p>Pay with Amazon</p>
                                            {
                                                // eslint-disable-next-line jsx-a11y/alt-text
                                                <img
                                                    style={{ width: '100px', objectFit: 'cover' }}
                                                    src="https://www.smartbusinessdaily.com/wp-content/uploads/2021/09/Amazon-payment-revision-needed.jpg"
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-cart max-width">
                        <div className="products-container">
                            {listCart &&
                                listCart.length > 0 &&
                                listCart.map((product: IproductItem, index) => {
                                    return (
                                        <ProductItem
                                            key={index}
                                            name={product.name}
                                            price={product.price}
                                            quantity={product.amount}
                                            img={product.thumbnail_url}
                                        />
                                    )
                                })}
                        </div>
                        <div className="total-cart-container">
                            <div className="payment-form">
                                <div className="subtotal-wrap d-flex">
                                    <div className="title">Subtotals:</div>
                                    <p>$24</p>
                                </div>
                                <div className="total-wrap d-flex">
                                    <div className="title">totals:</div>
                                    <p>$24</p>
                                </div>
                                <div className="shipping-wrap d-flex align-center">
                                    <CheckIcon />
                                    <p>Shipping & taxes calculated at checkout</p>
                                </div>
                                <Button
                                    btnColor="#19D16F"
                                    onClick={disable ? handleDisabled : handleSubmit}
                                    text="Proceed To Checkout"
                                    btnWidth="100%"
                                    padding="12px "
                                    radius="3px"
                                    style={{ border: 'none' }}
                                    disabled={disable}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {isSubmitting && (
                    <div className="loading-wrap">
                        <Loading size="80px" />
                    </div>
                )}
            </PaymentStyle>
            {/* <ToastContainer /> */}
        </div>
    )
}
const PaymentStyle = styled.div<{}>`
    padding: 150px 0px 350px 0px;
    width: 100%;
    /* background-color: #22374a; */
    display: flex;
    justify-content: center;
    .container-product {
        width: 1140px;
        display: flex;
        column-gap: 30px;
        .contact-Information {
            background-color: #f8f8fd;
            flex-grow: 1;
            height: fit-content;
            border-radius: 3px;
            .contact-Information-sub {
                .name-input {
                    display: flex;
                    gap: 30px;
                    input {
                        flex-grow: 1;
                    }
                }
                width: 100%;
                padding: 50px 33px;
                /* background-color: aliceblue; */
                /*  */
            }
        }
        .container-cart {
            width: 30%;
            /* background-color: aliceblue; */
            /* height: 100px; */
            display: flex;
            flex-direction: column;
            gap: 80px;
            .products-container {
                width: 100%;
                max-height: 380px;
                overflow-y: auto;
                ::-webkit-scrollbar {
                    width: 10px;
                }

                ::-webkit-scrollbar-track {
                    border-radius: 10px;
                    background-color: #e6e6e8;
                }

                ::-webkit-scrollbar-thumb {
                    background: #bababa;
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    cursor: pointer;
                    background: #bababa96;
                }
            }
        }
        .title-container {
            width: 100%;
            justify-content: space-between;
            margin-bottom: 48px;
            .product-text {
                width: 200px;
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
    }
    .contact-info {
        margin-bottom: 70px;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .shipping-address {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .width-100 {
        width: 100%;
    }
    .text-title {
        font-size: 18px;
        line-height: 21px;
        color: #1d3178;
        font-weight: 700;
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
    /* .selected {
        display: flex;
    } */
    .types {
        gap: 20px;
        margin-top: 20px;
    }
    .method-card {
        background: white;
        width: 200px;
        height: 100px;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 8px 40px rgba(26, 17, 75, 0.248);
        cursor: pointer;
        gap: 10px;
        p {
            font-weight: 500;
        }
    }
    .selected {
        border: 2px solid #fb2e86;
    }
`
