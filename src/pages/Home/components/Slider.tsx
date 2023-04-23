import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import styled, { css } from 'styled-components'
import { Banner } from './Banner'
import { Button } from '~/components'

export const Slider = () => {
    const renderIndicator = (clickHandle:any, isSelector: boolean) => (
        <Button
            onClick={clickHandle}
            Icon="dot"
            btnColor={isSelector ? 'var(--primary)' : 'white'}
            btnWidth="30px"
        ></Button>
    )
    return (
        <SliderStyle className='margin-top-124'>
            <Carousel
                autoPlay
                showArrows={false}
                showStatus={false}
                infiniteLoop
                interval={2000}
                renderIndicator={renderIndicator}
                emulateTouch
            >
                <Banner />
                <Banner />
                <Banner />
            </Carousel>
        </SliderStyle>
    )
}

const SliderStyle = styled.div<{}>`
    .control-dots {
        justify-content: center;
        display: flex;
        padding: 15px;
    }
`
