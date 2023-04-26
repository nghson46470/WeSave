import React from 'react'
import styled from 'styled-components'
import { logo1 } from '~/assets'
import { Button, FacebookIcon, InsIcon, TwiterIcon } from '~/components'

export const Footer = () => {
    return (
        <FooterStyle>
            <div className="footer-main-container">
                <div className="container-content max-width">
                    <div className="info-container ">
                        {/* <h1 className="info-title mr30">Hekto</h1> */}
                        {
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img src={logo1} style={{ width: '100px', height: '100px' }} />
                        }
                        <div
                            className="email-container d
                       -flex"
                        >
                            <input type="email" className="input-email" placeholder="Enter Email Address" />
                            <Button text="Sign Up" btnWidth="140px" padding="10px 0px" radius="3px" />
                        </div>
                        <p>Contact Info</p>
                        <p>98 Pham Van Dong, Bac Tu Liem District, Hanoi</p>
                    </div>
                    <div className="catagories-container">
                        <h4 className="title mr30">Catagories</h4>
                        <p>Laptops & Computers</p>
                        <p>Cameras & Photography</p>
                        <p>Smart Phones & Tablets</p>
                        <p>Clothings & cosmetics</p>
                        <p>Waterproof Headphones</p>
                    </div>
                    <div className="customer-container">
                        <h4 className="title-customer mr30">Customer Care</h4>
                        <p>My Account</p>
                        <p>Discount</p>
                        <p>Returns</p>
                        <p>Orders History</p>
                        <p>Order Tracking</p>
                    </div>
                    <div className="pages container">
                        <h4 className="title-page mr30">Pages</h4>
                        <p>Blog</p>
                        <p>Browse the Shop</p>
                        <p>Category</p>
                        <p>Pre-Built Pages</p>
                        <p>Visual Composer Elements</p>
                        <p>WooCommerce Pages</p>
                    </div>
                </div>
            </div>
            <div className="footer-sub-container">
                <div className="container-content-sub max-width">
                    <p>©WeSave - All Rights Reserved</p>
                    <div className="container-contact">
                        <FacebookIcon />
                        <InsIcon />
                        <TwiterIcon />
                    </div>
                </div>
            </div>
        </FooterStyle>
    )
}

const FooterStyle = styled.div<{}>`
    width: 100%;
    /* display: flex;
    justify-content: center; */
    .footer-main-container {
        width: 100%;
        height: 479px;
        background-color: #f6f5ff;
        display: flex;
        justify-content: center;
        align-items: center;
        .container-content {
            width: 1140px;
            display: flex;
            justify-content: space-around;
            column-gap: 30px;
            p {
                color: #8a8fb9;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                margin: 10px 0px;
            }
        }
    }
    .footer-sub-container {
        width: 100%;
        background-color: #e7e4f8;
        height: 53px;
        display: flex;
        justify-content: center;
        align-items: center;
        .container-content-sub {
            width: 80%;
            display: flex;
            justify-content: space-around;
        }
    }
    .mr30 {
        margin-bottom: 30px;
    }
    .container-contact {
        display: flex;
        gap: 10px;
    }
    .input-email {
        border: none;
        padding: 10px;
        outline: var(--primary);
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #8a8fb9;
    }
    .email-container {
        margin: 20px 0px;
    }
`
