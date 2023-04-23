import React from 'react'
import styled, { css } from 'styled-components'
import {Branches} from '~/assets'

export const BranchesList = () => {
    return (
        <BranchesStyle>
            <img src={Branches} alt="" />
        </BranchesStyle>
    )
}

const BranchesStyle =styled.div <{}>`
    display: flex;
    justify-content: center;
    padding: 110px 0;
`
