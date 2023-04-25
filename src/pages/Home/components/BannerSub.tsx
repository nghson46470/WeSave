import React from 'react'
import styled from 'styled-components'

export const BannerSub = () => {
    // const fakeData = [
    //     {
    //         description: 'All frames constructed with hardwood solids and laminates',
    //         color: 'var(--primary)',
    //     },
    //     {
    //         description: ' Reinforced with double wood dowels, glue, screw - nails corner blocks and machine nails',
    //         color: 'var(--blue)',
    //     },
    //     {
    //         description: 'Arms, backs and seats are structurally reinforced',
    //         color: 'var(--gold)',
    //     },
    // ]

    return (
        <BannerStyle>
            {/* <div className="img-banner-container">
                <img src={bannerSub} alt="" />
            </div>
            <div className="text-content-container d-flex">
                <div className="title-main">Unique Features Of leatest & Trending Poducts</div>
                <div className="description-container d-flex">
                    {fakeData &&
                        fakeData.length > 0 &&
                        fakeData.map((data, index) => {
                            return (
                                <div key={index} className="description">
                                    <CircleIcon color={data.color} />
                                    {data.description}
                                </div>
                            )
                        })}
                </div>
                <div className="button-wrap">
                    <Button text="Add To Cart" padding="14px 24px" btnWidth="160px" />
                    <div className="infor-sub-container">
                        <div className="origin-infor">B&B Italian Sofa </div>
                        <div className="price">$32.00</div>
                    </div>
                </div>
            </div> */}
            {

            // eslint-disable-next-line jsx-a11y/alt-text
            <img style={{width:'100%',objectFit:'cover',height:'100%'}} src="https://images.template.net/108270/website-digital-marketing-banner-j4258.jpeg"/>
            }
        </BannerStyle>
    )
}
const BannerStyle = styled.div<{}>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1f0ff;
    /* padding: 0% 15%; */
    height: 579px;
    .text-content-container {
        flex-direction: column;
        gap: 30px;
        .title-main {
            color: var(--blue);
            font-size: 35px;
            line-height: 132%;
            letter-spacing: 0.015em;
            font-weight: 700;
        }
        .description-container {
            flex-direction: column;
            gap: 15px;
            color: var(--grey);
            .description {
                gap: 17px;
                display: flex;
            }
        }
        .button-wrap {
            display: flex;
            align-items: center;
            gap: 20px;
            color: var(--blue);
            font-size: 14px;
            line-height: 24px;
            letter-spacing: 0.02em;
            font-weight: 600;
        }
    }
`
