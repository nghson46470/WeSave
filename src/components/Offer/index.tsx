import React, { useEffect } from 'react'
import { CashbackIcon, DeliveryIcon, PremiumIcon, SupportIcon } from '~/components'
import styled, { css } from 'styled-components'

interface IPropOfer {
    type?: 'delivery' | 'cashback' | 'premium' | 'support' |string | undefined
}
interface IOfferObj<TValue>{
    [key : string] : TValue
}

export const Offer = (props: IPropOfer) => {
    const { type = 'delivery' } = props

    const offerObject: IOfferObj<JSX.Element> = {
        delivery: <DeliveryIcon />,
        cashback: <CashbackIcon />,
        premium: <PremiumIcon />,
        support: <SupportIcon />,
    }
    const handleChangeElement = () => {
        return offerObject[type]
    }

    return (
        <OfferStyle className="d-flex">
            <div className="icon">{handleChangeElement()}</div>
            <div className="title-offer">24/7 Support</div>
            <div className="description-offer">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.
            </div>
        </OfferStyle>
    )
}

const OfferStyle = styled.div<{}>`
    width: 270px;
    height: 320px;
    flex-direction: column;
    align-items: center;
    padding: 45px 24px;
    box-shadow: 0px 8px 40px rgba(49, 32, 138, 0.05);
    transition: 0.3s;
    cursor: pointer;
    &:hover .icon {
        transform: scale(1.3);
    }
    .title-offer {
        margin: 40px 0px;
        font-size: 22px;
        line-height: 26px;
        color: var(--blue);
        font-weight: 700;
    }
    .description-offer {
        text-align: center;
        color: var(--grey);
    }
    .icon {
        transition: 0.3s;
    }
`
