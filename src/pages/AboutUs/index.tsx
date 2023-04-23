import React, { useState } from 'react'
import { banner, contact } from '~/assets'
import styled, { css } from 'styled-components'
import { config } from '~/config'
import { Button, HeadingPage, Offer } from '~/components'
import { ContactsUs } from 'src/modules/contact-us-form'

export const AboutUs = () => {
    const [openFormContact, setOpenFormContact] = useState(false)
    const breadcrumb = [
        {
            name: 'Home',
            path: config.routes.home,
        },
        {
            name: 'Pages',
            path: config.routes.Page404,
        },
        {
            name: 'About Us',
            path: config.routes.aboutUs,
        },
    ]
    const fakeData = ['delivery', 'cashback', 'premium', 'support']

    return (
        <>
            <HeadingPage title="About Us" breadCrumbs={breadcrumb} />
            <ContactsUs isOpen={openFormContact} handleClose={() => setOpenFormContact(false)} />
            <AboutUsStyle>
                <div className="container-content max-width">
                    <div className="features-main d-flex">
                        <img style={{
                            objectFit:'contain',
                        }} src={contact} alt="" />
                        <div className="features-description-wrap d-flex">
                            <h2>Who We Are?</h2>
                            <p className="description">
                                WeSave caters to thoughtful shoppers who appreciate second-hand items you just can't
                                find anywhere else. We are constantly connecting reputable, selective second-hand shops
                                and giving customers the best quality. Founded in Vietnam in 2023 we are proud to be the
                                first e-commerce platform that connects customers and stores with environmental
                                programs.
                            </p>
                            <p className="description">
                                2% of WeSave's annual revenue will be used to support environmental protection programs
                                throughout Vietnam and the world. WeSave provides top-quality and reputable buying and
                                selling services, ensuring the interests of all customers. Your satisfaction, our
                                reputation programs.
                            </p>
                            <h2>Our Mission</h2>
                            <p className="description">
                                We save old stuff, we save the world. Not only is an e-commerce site creating business
                                opportunities, but we also have a mission to connect people with the environment. Let's
                                join hands to reduce the causes of environmental pollution.
                            </p>
                            <h2>Our Vision</h2>
                            <p className="description">
                                Our Vision is to change the way our society connects with the second-hand industry by
                                providing our customers with services that are ethically and responsibly sourced. In a
                                world where the amount of waste discharged into the environment is limited, pollution
                                from many sources is prevented, and human health is affected.
                            </p>
                            <Button
                                text="Contact us"
                                btnWidth="145px"
                                padding="15px 0px"
                                radius="3px"
                                onClick={() => setOpenFormContact(true)}
                            />
                        </div>
                    </div>
                    <div className="shopex-offer-container d-flex max-width">
                        <div className="title-shopex-offer text-title">Our Features</div>
                        <div className="shopex-offer d-flex">
                            {fakeData.map((item: string, index) => {
                                return <Offer key={index} type={item} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="feedback-container d-flex">
                    <img src={banner} style={{width:'100%' ,height:'100%' ,objectFit:'cover'}} />
                    {/* <div className="title-wrap">Our Client Say!</div>
                    <div className="container-image-customer">
                        <img src="https://dongdo.edu.vn/wp-content/uploads/2022/03/hinh-girl-Nhat-cute.jpg" alt="" />
                        <img
                            className="absolute"
                            src="https://toigingiuvedep.vn/wp-content/uploads/2021/06/hinh-anh-gai-xinh-nhat-ban-de-thuong-1.jpg"
                            alt=""
                        />
                        <img src="https://dongdo.edu.vn/wp-content/uploads/2022/03/hinh-girl-Nhat-cute.jpg" alt="" />
                    </div>
                    <div className="athur">Selina Gomez</div>
                    <div className="position">Ceo At Webecy Digital</div>
                    <div className="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui
                        sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique
                        ultrices dolor aliquam lacus volutpat praesent.
                    </div> */}
                </div>
            </AboutUsStyle>
        </>
    )
}

const AboutUsStyle = styled.div<{}>`
    margin: 120px 0px 300px 0px;
    width: 100%;
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
    .container-content {
        width: 1140px;
        /* flex:1 ; */
        .features-main {
            align-items: flex-start;
            column-gap: 30px;
            .features-description-wrap {
                flex-direction: column;
                justify-content: center;
                h2 {
                    font-size: 36px;
                    line-height: 48px;
                    color: #151875;
                }
                .description {
                    margin: 14px 0px 50px 0px;
                    /* font-weight: 600; */
                    font-size: 16px;
                    line-height: 26px;
                    color: #8a8fb9;
                }
            }
        }
        .shopex-offer-container {
            flex-direction: column;
            align-items: center;
            width: 100%;
            row-gap: 60px;
            margin: 140px 0px;
            .title-shopex-offer {
                font-size: 42px;
                line-height: 26px;
                font-weight: 700;
            }
            .shopex-offer {
                width: 100%;
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px;
            }
        }
    }
    .feedback-container {
        background-color: #fbfbff;
        height: 503px;
        min-width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title-wrap {
            font-size: 42px;
            line-height: 26px;
            font-weight: 700;
            margin-bottom: 64px;
        }
        .container-image-customer {
            margin-bottom: 25px;
            display: flex;
            column-gap: 13px;
            img {
                border-radius: 3px;
                width: 55px;
                height: 55px;
            }
            .absolute {
                position: relative;
                /* margin-bottom:10px ; */
                bottom: 7px;
            }
        }
        .athur {
            font-weight: 600;
            font-size: 22px;
            line-height: 26px;
        }
        .description {
            text-align: center;
            max-width: 750px;
            font-weight: 700;
            font-size: 16px;
            line-height: 26px;
            color: #8a8fb9;
        }
        .position {
            font-weight: 600;
            font-size: 10px;
            line-height: 26px;
            color: #8a8fb9;
            margin-bottom: 14px;
        }
    }
`
