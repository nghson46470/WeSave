import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import styled, { css } from 'styled-components'
import { check, oclock, checklist, Branches } from '~/assets'
import { Button, HeadingPage } from '~/components'
import { config } from '~/config'

export const OderCompleted = () => {
    const navigate = useNavigate()
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
            name: 'Order Completed',
            path: config.routes.oderCompleted,
        },
    ]
    return (
        <div className="">
            <HeadingPage title="Order Completed" breadCrumbs={breadcrumb} />
            <OderCompletedStyle>
                <div className="container-completed">
                    <img className='check-img' src={check} alt="" />
                    <p className="title">Your Order Is Completed! </p>
                    <p className="description">
                        Thank you for your order! Your order is being processed and will be completed within 3-6 hours.
                        You will receive an email confirmation when your order is completed.
                    </p>
                    <Button className='btn-completed' onClick={()=>navigate(config.routes.home)} text="Continue Shopping" btnWidth="250px" padding="15px 36px" />
                    <img className='img-oclock' src={oclock} alt="" />
                    <img className='img-checklist' src={checklist} alt="" />
                </div>
                <img className='img-branches' src={Branches} alt="" />
            <ToastContainer />
            </OderCompletedStyle>
        </div>
    )
}

const OderCompletedStyle = styled.div<{}>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 187px 0px 84px 0px;
    row-gap:116px ;
    .container-completed {
        width: 1000px;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 24px;
        border-bottom:1px dashed #D2D1D1;
        border-left:1px dashed #D2D1D1;
        position: relative;
        p {
            text-align: center;
        }
        .description {
            width: 600px;
            font-weight: 600;
            font-size: 16px;
            line-height: 30px;
            text-align: center;
            color: #8d92a7;
        }
        .title {
            font-size: 36px;
            line-height: 42px;
            text-align: center;
            color: #101750;
            font-weight: 600;
        }
        .check-img{
            border: 10px solid #F6F7FA;
            padding: 10px;
            border-radius:50%;
        }
        .btn-completed{
            margin-bottom: 65px;
        }
        .img-checklist,.img-oclock{
            position: absolute;
        }
        .img-oclock{
            left: -50px;
        }
        .img-checklist{
            right: -30px;
            bottom: -30px;
        }
    }
    .img-branches{
        width: 60%;
    }
`
