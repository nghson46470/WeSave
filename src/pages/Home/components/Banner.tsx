import React from 'react'
import styled, { css } from 'styled-components'
import { bulbImg, chairImg } from '~/assets'
import { Button } from '~/components'

export const Banner = () => {
    return (
        <BannerStyle>
            <div className="container_content_banner d-flex">
                <div className="text-content-wrap ">
                    <img className="bulbImg" src={bulbImg} alt="" />
                    <div className="sub-description">Best Furniture For Your Castle....</div>
                    <div className="title-main">New Furniture CollectionTrends in 2020</div>
                    <div className="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus
                        non in justo.
                    </div>
                    <Button text="Shop Now" padding="16px 40px" btnWidth="163px" />
                </div>
                <div className="image_content-wrap">
                    <div className="image_content-wrap-sub">
                        <img className="chairImg" src={chairImg} alt="" />
                    </div>
                </div>
            </div>
        </BannerStyle>
    )
}

const BannerStyle = styled.div<{}>`
    height: 764px;
    width: 100%;
    background-color: #7ED957;
    justify-content: center;
    display: flex;
    .container_content_banner {
        /* padding: 0px 200px; */
        display: flex;
        justify-content: center;
        height: 100%;
        width: 1140px;
        gap: 50px;
        .text-content-wrap {
            text-align: left;
            .sub-description {
                margin-top: 30px;
                font-weight: 700;
                font-size: 16px;
                line-height: 28px;
                color: var(--primary);
            }
            .title-main {
                margin: 12px 0px;
                font-size: 53px;
                line-height: 82px;
                letter-spacing: 0.015em;
                font-weight: 700;
            }
            .description {
                margin-bottom: 30px;
                color: var(--grey);
                font-weight: 600;
                font-size: 16px;
                line-height: 28px;
            }
            .bulbImg {
                width: 158px;
                height: 173px;
            }
        }
    }
    .image_content-wrap {
        height: 100%;
        display: flex;
        align-items: center;
    }

`
