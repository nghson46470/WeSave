import React from 'react'
import styled, { css } from 'styled-components'
import { sale } from '~/assets'
import { ListHandle } from '~/components'

interface IpropProducts {
    name: string
    price: number
    images: Iimage[]
    discount: number
    followed: boolean
    description: string
    handleClickHeart?: () => void
    handleClickAddCart?: () => void
    added ?: boolean
}
interface Iimage {
    image_url: string
    is_thumbnail: boolean
}

export const LatestProduct = (props: IpropProducts) => {
    const { name, price, images, discount, followed, description } = props

    const discountedPrice = discount ? price * (1 - discount / 100) : price

    return (
        <LastetProductStyle>
            <div className="img-product-container">
                {images &&
                    images.length > 0 &&
                    images.map((item: Iimage,index) => {
                        if (item.is_thumbnail) {
                            return <img key={index} className="img" src={item.image_url} alt="" />
                        }
                    })}
            </div>
            <div className="text-product-container d-flex">
                <div className="name-product">{name}</div>
                <div className="price-product d-flex">
                    <div className="current-price-product">${discountedPrice}</div>
                    <div className="prev-price-product">${price}</div>
                </div>
            </div>
            <div className='sale'>
                <img src={sale} alt="" />
            </div>
            <div className="list-handle-wrap">
                <ListHandle
                    direction='column'
                    // handleClickHeart={handleClickHeart}
                    // handleClickAddCart={handleClickAddCart}
                    // followed ={followed}
                    // added ={added}
                /></div>
        </LastetProductStyle>
    )
}
const LastetProductStyle = styled.div<{}>`
    transition: 0.2s;
    margin: 50px 0px;
    width: 360px;
    height: 360px;
    padding: 10px;
    /* background-color: #9a6a82ae; */
    /* border: 3px solid #fea9d234; */
    position: relative;
    overflow: hidden;
    &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
        /* background-color: white; */
    }
    &:hover .sale{
        /* display: inline-block; */
        /* transform: translateX(0); */
        opacity: 1;
    }
    &:hover .list-handle-wrap{
        opacity: 1;
    }
    .img-product-container {
        width: 100%;
        height: 80%;
        background-color: #f7f7f7;
        .img {
            width: 100%;
            height: 100%;
        }
    }
    .text-product-container {
        padding: 15px 0px;
        color: var(--blue);
        justify-content: space-between;
        .name-product {
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
        }
        .price-product {
            font-size: 14px;
            line-height: 16px;
            font-weight: 550;
            gap: 9px;
            margin-left: 10px;
            .prev-price-product {
                text-decoration: line-through;
                color: var(--primary) !important;
            }
            .current-price-product {
            }
        }
    }
    .sale{
        position: absolute;
        top: 0px;
        left: 0px;
        /* transform: translateX(-100px); */
        /* display: none; */
        opacity: 0;
        transition: all 0.4s ease;
        /* background-color: aliceblue; */
        /* img{
            transition: all 1s ease;
        } */
    }
    .list-handle-wrap{
        top: 146px;
        left: 15px;
        position: absolute;
        opacity: 0;
        transition: 0.4s;
    }
`
