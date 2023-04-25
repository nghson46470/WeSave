import { Button, FacebookIcon, InsIcon, TwiterIcon, VoteIcon } from '~/components'
import styled, { css } from 'styled-components'
import { Iimage, IProductInfo } from '~/interfaces'
import { useNavigate } from 'react-router-dom'

export const ProductInfo = (props: IProductInfo) => {
    const {
        name,
        price = 0,
        images,
        followed,
        added_to_cart,
        handleAddCard,
        handleClickThumbnailImage,
    } = props
    const navigate = useNavigate()



    return (
        <ProductDetailStyle followed={followed} added_to_cart={added_to_cart}>
            <div className="product">
                <div className="left">
                    {images &&
                        images.length > 0 &&
                        // eslint-disable-next-line array-callback-return
                        images.map((item: Iimage, index) => {
                            if (!item.is_thumbnail) {
                                return (
                                    <img
                                        key={index}
                                        src={item.image_url}
                                        onClick={() => {
                                            handleClickThumbnailImage && handleClickThumbnailImage(item?.id)
                                        }}
                                        className="img-thumbnail-sub"
                                        alt=""
                                    />
                                )
                            }
                        })}
                </div>
                <div className="right">
                    {images &&
                        images.length > 0 &&
                        // eslint-disable-next-line array-callback-return
                        images.map((item, index) => {
                            if (item.is_thumbnail) {
                                return <img key={index} src={item.image_url} alt="" />
                            }
                        })}
                </div>
                <div className="info">
                    <h3 className="name">{name}</h3>
                    <div className="star-icon-wrap">
                        <VoteIcon color="var(--gold)" />
                        <VoteIcon color="var(--gold)" />
                        <VoteIcon color="var(--gold)" />
                        <VoteIcon color="var(--gold)" />
                        <VoteIcon color="var(--gold)" />
                    </div>
                    <div className="price">
                        <div className="discounted-price">${5.2}</div>
                        <del className="main">${price}</del>
                    </div>
                    <div className="color">Color</div>
                    <div className="description">
                        This high-quality regular-fit tee has a casually elegant vibe. Additionally, the unbelievably
                        soft tri-blend fabric makes it extremely comfortable – once put on, impossible to take off.
                    </div>
                    <div className="description">50% Polyester 25% Soft cotton 25% Rayon</div>
                    <div className="description">TLight Fabric (4.3 oz/yd² (146 g/m²))</div>
                    <div className="description">Regular fit - SIZE M</div>
                    <div className="description" style={{fontWeight:600,color:'#4b54a1'}}>Condition: 95%</div>
                    <div className="actions">
                        <span className="add-to-cart">
                            <Button
                                text={added_to_cart ? 'Remove to cart' : 'Add to Cart'}
                                btnWidth="200px"
                                padding="15px 5px"
                                radius="3px"
                                onClick={handleAddCard}
                                btnColor={added_to_cart ? '#6c6c6c' : 'var(--primary)'}
                            />
                        </span>
                        <div className="follow" onClick={() => navigate('/profile')}>
                            {/* <HeartIcon color={followed ? 'white' : 'var(--dark-blue)'} /> */}
                            {

                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img
                                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                src="https://down-ws-vn.img.susercontent.com/da75b8bf75f27cd8df06542cdaafce1f_tn"
                            />
                            }
                        </div>
                    </div>
                    <div className="category">Categories</div>
                    <div className="tag">Tag</div>
                    <div className="socials">
                        Share
                        <span className="icon">
                            <FacebookIcon />
                        </span>
                        <span className="icon">
                            <InsIcon color="var(--primary)" />
                        </span>
                        <span className="icon">
                            <TwiterIcon />
                        </span>
                    </div>
                </div>
            </div>
        </ProductDetailStyle>
    )
}

const ProductDetailStyle = styled.div<{
    followed?: boolean
    added_to_cart?: boolean
}>`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 130px 0px;
    max-width: 2000px;
    /* min-width: 1500px; */
    cursor: pointer;
    .product {
        width: 1140px;
        padding: 10px;
        box-shadow: 0px 0px 25px 10px #f6f4fd;
        border-radius: 2px;
        display: flex;
        justify-content: space-around;
        column-gap: 40px;
        /* flex-wrap: wrap; */
    }
    .left {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
    .left img {
        width: 150px;
        object-fit: cover;
        height: 151px;
        display: block;
    }
    .right img {
        height: 470px;
        width: 400px;
        /* height: auto; */
        object-fit: cover;
        animation: image 0.2s linear;
        transform-origin: top left;
        @keyframes image {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }
    }

    .info {
        width: 100%;
        padding-left: 41px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-items: center; */
    }
    .follow {
        width: 40px;
        height: 40px;
        /* background-color: #d2d7f679; */
        border-radius: 50%;
        box-shadow: 0px 8px 40px rgba(50, 32, 138, 0.111);
        display: flex;
        justify-content: center;
        align-items: center;
        /* border: 1px solid var(--primary); */
        ${(p) =>
            p.followed &&
            css`
                background-color: var(--primary);
            `}
        /* svg {
            path {
                fill: #535399;
            }
        } */
        &:hover {
            cursor: pointer;
            background-color: #a9acc6;
        }
    }
    .name {
        font-size: 36px;
        line-height: 42px;
        color: var(--blue);
    }
    .price {
        display: flex;
        padding-top: 14px;
        font-size: 16px;
        line-height: 29px;
        .discounted-price {
            margin-right: 18px;
            color: var(--blue);
        }
        .main {
            color: #fb2e86;
        }
    }
    .color {
        margin-top: 12px;
        font-size: 16px;
        line-height: 19px;
        color: var(--blue);
    }
    .description {
        color: #a9acc6;
        font-size: 16px;
        line-height: 29px;
        margin-top: 12px;
    }
    .actions {
        margin-top: 34px;
        display: flex;
        align-items: center;
        .add-to-cart {
            /* font-size: 16px;
            line-height: 29px;
            text-transform: capitalize;
            color: #151875;
            margin-left: 71px;
            margin-right: 20px; */
            width: 250px;
            ${(p) =>
                p.added_to_cart &&
                css`
                    opacity: 0.7;
                `}
        }
    }
    .category,
    .tag,
    .socials {
        color: #151875;
        font-size: 16px;
        /* line-height: 29px; */
        font-weight: 600;
    }
    .socials {
        display: flex;
        align-items: center;
    }
    .category {
        margin-top: 17px;
    }
    .tag {
        margin-top: 10px;
    }
    .socials {
        margin-top: 10px;
        .icon {
            margin-left: 10px;
        }
    }
    .img-thumbnail-sub {
        &:hover {
            cursor: pointer;
            opacity: 0.7;
            transition: 0.2;
        }
    }
`
