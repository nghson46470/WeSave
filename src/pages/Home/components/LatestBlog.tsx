import React from 'react'
import styled, { css } from 'styled-components'

import { PenIcon, CalendarIcon } from '~/components'

interface IblogProduct {
    description: string
    image_url: string
    title: string
    author: string
}

export const LatestBlog = (props: IblogProduct) => {
    const { description, image_url, title, author } = props
    
    return (
        <LatestBlogStyle>
            <div className="container-img">
                <img className="img" src={image_url} alt="" />
            </div>
            <div className="infor-container ">
                <div className="infor-sub-wrap d-flex">
                    <div className="saler-wrap">
                        <PenIcon className="icon" />
                        {author}
                    </div>
                    <div className="calendar-wrap">
                        <CalendarIcon className="icon" />
                        21 August,2020
                    </div>
                </div>
                <div className="title-main-wrap">{title}</div>
                <div className="description-wrap">
                    {description}
                </div>
                <div className="read-more-container">Read More</div>
            </div>
        </LatestBlogStyle>
    )
}
const LatestBlogStyle = styled.div<{}>`
    border-radius: 5px;
    width: 350px;
    height: 550px;
    display: flex;
    flex-direction: column;
    color: var(--blue);
    box-shadow: 0px 8px 40px rgba(49, 32, 138, 0.05);
    cursor: pointer;
    &:hover .read-more-container,
    &:hover .title-main-wrap {
        color: var(--primary);
    }
    .container-img {
        flex-grow: 1;
        height: 50%;
        .img {
            border-radius: 5px;
            width: 100%;
            height: 100%;
        }
    }
    .infor-container {
        flex-grow: 1;
        padding: 20px;
        height: 50%;
        .infor-sub-wrap {
            gap: 30px;
            .icon {
                margin-right: 5px;
            }
        }
        .title-main-wrap {
            font-size: 18px;
            line-height: 21px;
            font-weight: 600;
        }
        .description-wrap {
            margin-bottom: 14px;
            color: var(--grey);
        }
        .title-main-wrap {
            margin: 31px 0px;
        }
        .read-more-container {
            text-decoration: underline;
            font-weight: 400;
            font-size: 16px;
            line-height: 30px;
        }
    }
`
