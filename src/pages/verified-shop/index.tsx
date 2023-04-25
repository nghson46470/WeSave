import React, { CSSProperties, useRef, useState } from 'react'
import styled from 'styled-components'
import {  useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import LazyLoad from 'react-lazyload'

import { Branches } from '~/assets'
import { HeadingPage, Loading } from '~/components'
import { config } from '~/config'
import { productApi } from '~/api'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import { getUnpaidCart } from 'src/redux/slices'
import { Iimage } from '~/interfaces'
import { useThrottle } from '~/Hook'
import { ProductItem } from '../SearchResult/components/ProductItem'
import { listShop } from 'src/components/fake-data/list-shop'

interface IProduct {
    followed: boolean
    id: string | number
    added_to_cart: boolean
}

interface IlistResult {
    id: string | number
    productItem: IProductItem
}

export interface Iresponse {
    followed?: boolean
}

interface IProductItem {
    style?: CSSProperties
    images?: Array<Iimage>
    title: string
    description: string
    price: number
    discount: number
    followed: boolean
    name: string
    product: string
    id: number
    added_to_cart: boolean
    onClick?: () => void
    handleClickHeart: () => void
    handleClickCart: () => void
}

export const VerifiedShop = () => {
    const [listResult, setListResult] = useState<IlistResult[]>([])
    const [showNotFound,] = useState<boolean>(false)
    const [loading, ] = useState<boolean>(false)
    const [increment, setIncrement] = useState<number>(1)
    // const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const throttle = useThrottle(increment, 3000)
    // const textSearch = location.search.split('=')[1]
    const fetchingProducts = useRef<Array<number | string>>([])
    const token = useAppSelector((state) => state.auth.token)

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
            name: 'Verified Shops List',
            path: config.routes.searchResult,
        },
    ]

    // const handleGetProduct = () => {
    //     setLoading(true)
    //     productApi.getProduct(textSearch, true)?.then((res: AxiosResponse) => {
    //         setListResult(res.data)
    //         setLoading(false)
    //         if (res.data.length == 0) {
    //             setShowNotFound(true)
    //         } else {
    //             setShowNotFound(false)
    //         }
    //     })
    // }

    // useEffect(handleGetProduct, [textSearch])

    const handleClickHeart = (product: IProduct) => {
        if (!token) {
            alert('You not login')
            navigate(config.routes.login)
            return
        }
        setIncrement(increment + 1)
        if (increment === throttle) {
            const followed = product.followed
            const postApi = followed ? productApi.unFollow(product.id) : productApi.follow(product.id)
            fetchingProducts.current.push(product.id)

            postApi
                ?.then((res: Iresponse & AxiosResponse) => {
                    const newProducts = listResult.map((item) => {
                        if (item.id === product.id) {
                            return {
                                ...item,
                                followed: res?.followed,
                            }
                        } else {
                            return item
                        }
                    })
                    setListResult(newProducts)
                })
                .catch(() => {
                    toast.error('Have an error.')
                })
                .finally(() => {
                    fetchingProducts.current = fetchingProducts.current.filter((id) => id !== product.id)
                })
        }
    }

    const handleClickCart = (product: IProduct) => {
        const added = product.added_to_cart
        const postApi = added ? productApi.removeFromCart(product.id) : productApi.addToCart(product.id)

        if (!token) {
            alert('You not login')
            navigate(config.routes.login)
            return
        }
        postApi
            ?.then((res: any) => {
                const newProducts = listResult.map((item) => {
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

                setListResult(newProducts)
            })
            .catch(() => {
                toast.error('Have an error.')
            })
            .finally(() => {
                fetchingProducts.current = fetchingProducts.current.filter((id) => id !== product.id)
            })
    }

    const handleChangePage = (id: number) => {
        navigate('/product-Detail/' + id)
    }

    return (
        <>
            <HeadingPage title="Verified Shops List" breadCrumbs={breadcrumb} />
            <VerifiedShopStyle>
                <div className="list-product-container">
                    {showNotFound && (
                        <div className="not-resuilt">sorry!! no results, please try something else...</div>
                    )}
                    {listShop.data &&
                        listShop.data.length > 0 &&
                        listShop.data.map((product: any, index) => {
                            return (
                                <LazyLoad
                                    className="list-product-container-sub"
                                    key={product.id}
                                    height={1000}
                                    offset={[-100, 200]}
                                    placeholder={<Loading />}
                                >
                                    <ProductItem
                                        nameShop={product.name_shop}
                                        addressShop={product.address}
                                        phoneShop={product.phone_shop}
                                        isShop
                                        stars={product.stars}
                                        key={index}
                                        images={product.images}
                                        title={`Shop ${index+1}`}
                                        description={product.description}
                                        // price={product.price}
                                        discount={product.discount}
                                        followed={product.followed}
                                        handleClickHeart={() => handleClickHeart(product)}
                                        onClick={() => handleChangePage(product.id)}
                                        addCart={product.added_to_cart}
                                        handleClickCart={() => handleClickCart(product)}
                                    />
                                </LazyLoad>
                            )
                        })}
                    <img src={Branches} className="img-branches max-width" alt="" />
                </div>
                <ToastContainer />
                {loading && (
                    <div className="loading-wrap">
                        <Loading size="80px" />
                    </div>
                )}
            </VerifiedShopStyle>
        </>
    )
}

const VerifiedShopStyle = styled.div<{}>`
    .list-product-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 34px;
        margin: 125px 0px;
        .list-product-container-sub {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
    }
    .list-product-container > img {
        margin-top: 100px;
    }
    .img-branches {
        width: 60%;
    }
    .not-resuilt {
        font-size: 36px;
        line-height: 42px;
        text-align: center;
        font-weight: 700;
        color: var(--blue);
    }
    .loading-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0px;
        position: fixed;
        width: 100%;
        height: 100%;
        background: #00000041;
    }
`
