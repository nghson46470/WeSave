import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Branches, notFound } from '~/assets'

import { Button, HeadingPage } from '~/components'
import { config } from '~/config'
import { Banner } from '../Home/components/Banner'

export const NotFound = () => {

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
            name: '404 notfound',
            path: config.routes.Page404,
        },
    ]
    return (
        <div>
            <HeadingPage title="404 not found" breadCrumbs={breadcrumb} />
            <NotFoundStyle>
                <div className="img-container">
                    <img src={notFound} alt="" />
                </div>
                <Button text='Back to home' btnWidth='165px' padding='15px 30px' radius='3px' onClick={()=>navigate('/')}/>
                <div className="branches-img">
                    <img src={Branches} alt="" />
                </div>
            </NotFoundStyle>
        </div>
    )
}

const NotFoundStyle = styled.div<{}>`
    width: 100%;
    display: flex;
    margin: 50px 0px;
    flex-direction: column;
    align-items: center;
    .branches-img{
        margin-top: 124px;
    }
`
