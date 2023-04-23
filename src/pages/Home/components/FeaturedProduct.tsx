import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import { RectangleIcon } from 'src/components/icons'
import styled, { css } from 'styled-components'
import { Button, ListHandle } from '~/components'
import { config } from '~/config'

interface IPropFeatureProduct {
    name: string
    price: number
    code: string
    id: string
    img: Array<Iimage>
    handleClickHeart?: () => void
    followed: boolean
    handleClickAddCart?: () => void
    added: boolean
}

interface Iimage {
    image_url: string
    is_thumbnail: boolean
}

export const FeaturedProduct = (props: IPropFeatureProduct) => {
    const { name, price, code, img, id, handleClickHeart, followed, handleClickAddCart, added } = props

    const fakeData = [
        {
            color: 'var(--primary)',
        },
        {
            color: 'var(--green)',
        },
        {
            color: 'var(--gold)',
        },
    ]

    return (
        <FeaturedProductStyle>
            <Link to={generatePath(config.routes.productDetail, { id: id })}>
                <div className="img-wrap">
                    {img &&
                        img.length > 0 &&
                        img.map((image: Iimage,index) => {
                            if (image.is_thumbnail) {
                                return <img key={index} className="image" src={image.image_url} alt="" />
                            }
                        })}
                </div>
                <div className="text-content-wrap">
                    <div className="name-product" title={name}>
                        {name}
                    </div>
                    <div className="icon-wrap">
                        {fakeData &&
                            fakeData.length > 0 &&
                            fakeData.map((data, index) => {
                                return <RectangleIcon key={index} color={data.color} />
                            })}
                    </div>
                    <div className="code-text">Code - {code}</div>
                    <div className="price">${price}</div>
                </div>
                <Button
                    className="btn-view-detail"
                    text="View Details"
                    btnColor="#08D15F"
                    radius="3px"
                    btnWidth="150px"
                    padding="8px 13px"
                />
            </Link>
            <div className="list-handle-wrap">
                <ListHandle
                    handleClickHeart={handleClickHeart}
                    handleClickAddCart={handleClickAddCart}
                    followed={followed}
                    added={added}
                />
            </div>
        </FeaturedProductStyle>
    )
}
const FeaturedProductStyle = styled.div<{}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
    width: fit-content;
    width: 270px;
    height: 370px;
    cursor: pointer;
    position: relative;
    transition: 0.3s;
    &:hover .name-product,
    &:hover .code-text,
    &:hover .price {
        color: white !important;
    }
    &:hover {
        background-color: var(--blue);
    }
    &:hover .list-handle-wrap,
    &:hover .btn-view-detail {
        opacity: 1;
    }
    &:hover .image {
        width: 80% !important;
        height: 80% !important;
    }
    a {
        width: 100%;
        height: 100%;
    }
    .img-wrap {
        width: 100%;
        height: 60%;
        background-color: #f6f7fb;
        display: flex;
        justify-content: center;
        align-items: center;
        .image {
            width: 100%;
            height: 100%;
        }
    }
    .text-content-wrap {
        height: 40%;
        margin: 15px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        .name-product {
            text-align: center;
            color: var(--primary);
            font-weight: 700;
            font-size: 18px;
            line-height: 22px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .icon-wrap {
            display: flex;
            gap: 5px;
        }
        .code-text,
        .price {
            color: var(--dark-blue);
            font-size: 14px;
            line-height: 16px;
            font-weight: 550;
        }
    }
    .list-handle-wrap {
        top: 20px;
        left: 10px;
        position: absolute;
        opacity: 0;
        transition: 0.4s;
    }
    .btn-view-detail{
        position: absolute;
        opacity: 0;
        transition: 0.4s;
        top :45%;
        right: 50%;
        transform: translate(50%);
    }
`
