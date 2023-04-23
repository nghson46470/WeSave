import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface IPropHeadingPage {
    breadCrumbs: IBreadcrumb[]
    title: string
}

interface IBreadcrumb {
    name: string
    path: string
}
export const HeadingPage = (props: IPropHeadingPage) => {
    const { breadCrumbs = [], title = '' } = props

    return (
        <HeadingPageStyle className="margin-top-124">
            <div className="title-container max-width">
                <div className="title-main">{title}</div>
                <div className="bread-crumb-container">
                    {breadCrumbs &&
                        breadCrumbs.length > 0 &&
                        breadCrumbs.map((breadCrumb: IBreadcrumb, index: number) => {
                            return (
                                <div className="breadcrumb-item" key={index}>
                                    <Link
                                        to={breadCrumb.path}
                                        className={index === breadCrumbs.length - 1 ? 'isActive' : ''}
                                    >
                                        {breadCrumb.name}
                                    </Link>
                                    {index !== breadCrumbs.length - 1 && <span className="dot">.</span>}
                                </div>
                            )
                        })}
                </div>
            </div>
        </HeadingPageStyle>
    )
}

const HeadingPageStyle = styled.div<{}>`
    height: 286px;
    background-color: #f6f5ff;
    display: flex;
    align-items: center;
    justify-content: center;
    .title-container {
        width: 1140px;
        /* margin-left: 10%; */
        .title-main {
            font-size: 36px;
            line-height: 42px;
            /* text-align: center; */
            font-weight: 700;
        }
        .bread-crumb-container {
            margin-top: 7px;
            display: flex;
            .dot {
                margin: 0px 3px;
            }
        }
    }
    .isActive {
        color: var(--primary);
    }
    a {
        text-decoration: none;
        color: black;
    }
`
