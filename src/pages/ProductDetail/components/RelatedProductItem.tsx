import styled, { css } from 'styled-components'
import { VoteIcon } from '~/components'
import { IProductInfo } from '~/interfaces'

export const RelatedProductItem = (props: IProductInfo) => {
    const { name, price, images, onClick } = props
    return (
        <RelatedProductItemStyle onClick={onClick}>
            {images &&
                images.length > 0 &&
                images.map((item,index) => {
                    if (item.is_thumbnail) {
                        return <div key={index} className="image" style={{ backgroundImage: `url(${item.image_url})` }} />
                    }
                })}
            <div className="container-info">
                <div className="info-product">
                    <div className="name" title={name}>
                        {name}
                    </div>
                    <div className="price">${price}</div>
                </div>
                <div className="container-vote">
                    <VoteIcon color='var(--gold)'/>
                    <VoteIcon color='var(--gold)'/>
                    <VoteIcon color='var(--gold)'/>
                    <VoteIcon color='var(--gold)'/>
                    <VoteIcon/>
                </div>
            </div>
        </RelatedProductItemStyle>
    )
}

const RelatedProductItemStyle = styled.div<{}>`
    width: 270px;
    cursor: pointer;
    /* height: 400px; */
    padding: 10px;
    box-sizing: border-box;
    transition: 0.3s;
    /* border: 3px solid #dddddd70; */
    box-shadow: 0px 0px 25px 5px rgba(217, 217, 217, 0.299);

    &:hover .image {
        /* background-color: white; */
    }
    &:hover {
        /* background-color: #c8d2fb; */
        box-shadow: 0px 0px 25px 5px rgba(136, 136, 136, 0.246);
        /* background-color: #f6f7fb; */
    }
    .image {
        padding-top: 125%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 5px;
        background-color: #f6f7fb;
        transition: 0.3s;
    }
    .container-info{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 20px;
    }
    .info-product{
        width: 70%;
    }
    .name {
        font-size: 16px;
        line-height: 19px;
        color: var(--blue);
        font-weight: 550;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .price {
        margin-top: 15px;
        font-size: 13px;
        line-height: 15px;
        color: var(--blue);
        font-weight: 550;
    }
`
