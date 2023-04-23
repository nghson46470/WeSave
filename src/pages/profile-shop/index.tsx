import React, { useRef, useState } from 'react'
import { listFeatures } from 'src/components/fake-data'
import { FeaturedProduct } from '../Home/components/FeaturedProduct'
import { toast } from 'react-toastify'
import { getUnpaidCart } from 'src/redux/slices'
import { productApi } from '~/api'
import { Iimage } from '~/interfaces'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import { config } from '~/config'
import styled from 'styled-components'
import { listClothes } from 'src/components/fake-data/list-clothes'
import { profileShop } from '~/assets'

interface IpropProducts {
    name: string
    code: string
    price: number
    images: Iimage[]
    discount: number
    followed: boolean
    description: string
    id: string
    added_to_cart: boolean
}

interface IProduct {
    followed: boolean
    id: string | number
    added_to_cart: boolean
}

export const ProfileShopPage = () => {
    const [featuredProducts, setFeaturedProducts] = useState<IpropProducts[]>([])
    const navigate = useNavigate()
    const token = useAppSelector((state) => state.auth.token)
    const fetchingProducts = useRef<Array<number | string>>([])
    const dispatch = useAppDispatch()

    const handleClickAddCart = (product: IProduct, type: string) => {
        const added = product.added_to_cart

        if (!token) {
            alert('You not login')
            navigate(config.routes.login)
            return
        }
        if (fetchingProducts.current.length === 0) {
            fetchingProducts.current.push(product.id)
            const postApi = added ? productApi.removeFromCart(product.id) : productApi.addToCart(product.id)
            postApi
                ?.then((res: any) => {
                    const newProducts = featuredProducts.map((item) => {
                        if (item.id === product.id) {
                            dispatch(getUnpaidCart())
                            if (!added) {
                                toast.success('added to cart', { autoClose: 1500 })
                            } else {
                                toast.success('Remove to cart', { autoClose: 1500 })
                            }
                            return {
                                ...item,
                                added_to_cart: res?.added_to_cart,
                            }
                        } else {
                            return item
                        }
                    })

                    setFeaturedProducts(newProducts)
                })
                .catch(() => {
                    toast.error('Have an error.')
                })
                .finally(() => {
                    fetchingProducts.current = fetchingProducts.current.filter((id) => id !== product.id)
                })
        }
    }
    return (
        <ClothesStyle>
            <div className="container-home-main d-flex">
                <div className="featured-product-container d-flex max-width">
                    <div className="profile">
                        <img src={profileShop} />
                        <div className="vote-container">
                            <span className="vote reply">
                            <p>Response rate :</p>
                            <p className="color-pink">99%</p>
                            </span>
                            <span className="vote reply">
                            <p >Evaluate :</p>
                            <p className="color-pink">4.9 (247k vote)</p>
                            </span>
                            <span className="vote reply">
                            <p>Products : </p>
                            <p className="color-pink">120</p>
                            </span>
                            {/* <p>sonnguyen</p>
                            <p>sonnguyen</p>
                            <p>sonnguyen</p> */}
                        </div>
                    </div>
                    <img src="https://down-ws-vn.img.susercontent.com/25f0f7735c87d7fd02717cb01e63733e" />
                    <div className="title-featured-product text-title">Clothes</div>
                    <div className="featured-products d-flex">
                        {listClothes.data &&
                            listClothes.data.length > 0 &&
                            listClothes.data.map((product: any, index) => {
                                return (
                                    <FeaturedProduct
                                        key={index}
                                        name={`clothes ${index + 1}`}
                                        code={product.code}
                                        price={product.price}
                                        img={product.images}
                                        id={product.id}
                                        // handleClickHeart={() => handleClickHeart(product, 'featured')}
                                        followed={product.followed}
                                        // followed={active}
                                        added={product.added_to_cart}
                                        handleClickAddCart={() => handleClickAddCart(product, 'featured')}
                                    />
                                )
                            })}
                    </div>
                </div>
            </div>
        </ClothesStyle>
    )
}

const ClothesStyle = styled.div<{}>`
    width: 100%;
    .color-pink{
        color: #d0011b;
    }
    .vote{
        display: flex;
        gap: 4px    ;
    }
    .vote-container{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .profile {
        display: flex;
        width: 100%;
        background-color: white;
        box-shadow: 0px 8px 40px rgba(50, 32, 138, 0.111);
        gap: 40px;
        padding: 16px;
        margin-top: 30px;
    }
    .container-home-main {
        margin: 120px 0px;
        width: 100%;
        /* padding: 0px 150px; */
        flex-direction: column;
        align-items: center;
        .featured-product-container {
            flex-direction: column;
            align-items: center;
            gap: 48px;
            width: 1140px;
            .featured-products {
                width: 100%;
                gap: 20px;
                justify-content: center;
                flex-wrap: wrap;
            }
        }
        .shopex-offer-container {
            flex-direction: column;
            align-items: center;
            width: 1140px;
            gap: 55px;
            .shopex-offer {
                width: 100%;
                justify-content: center;
                flex-wrap: wrap;
                gap: 20px;
            }
        }
    }
    .trending-product-container {
        margin: 80px 0px;

        /* padding: 0px 150px; */
        flex-direction: column;
        align-items: center;
        .desciption-trending {
            text-align: center;
            width: 630px;
            margin-bottom: 22px;
            font-size: 35px;
            line-height: 155%;
            letter-spacing: 0.015em;
            color: var(--blue);
            font-weight: 600;
        }
        .trending-title {
            margin: 50px 0px;
        }
        .product-trending {
            width: 1140px;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            row-gap: 30px;
        }
    }
    .container-img-wrap {
        width: 100%;
        .img {
            width: 100%;
        }
    }
    .branches-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 76px;
        .img-branches {
            width: 60%;
        }
    }
    .container-latest-blog {
        padding: 135px 0px;
        flex-direction: column;
        align-items: center;
        width: 100%;
        .latest-blog {
            display: flex;
            width: 1140px;
            justify-content: center;
            margin-top: 80px;
            flex-wrap: wrap;
            gap: 40px;
        }
    }
    .text-title {
        font-size: 42px;
        line-height: 49px;
        color: var(--blue);
        font-weight: 600;
    }
`
