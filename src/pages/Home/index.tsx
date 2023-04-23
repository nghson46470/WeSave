import React, { useEffect, useRef, useState } from 'react'
import { generatePath, Link, useNavigate } from 'react-router-dom'
import { DeliveryIcon } from 'src/components/icons'
import styled, { css } from 'styled-components'
import { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import _ from 'lodash'

import { productApi, blogApi } from '~/api'
import { Branches, rectangle } from '~/assets'
import { Button, LoadingDot } from '~/components'
import { config } from '~/config'
import { BannerSub } from './components/BannerSub'
import { FeaturedProduct } from './components/FeaturedProduct'
import { LatestBlog } from './components/LatestBlog'
import { LatestProduct } from './components/LatestProduct'
import { Slider } from './components/Slider'
import { TrendingProducts } from './components/TrendingProducts'
import { Offer } from '~/components'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import { getUnpaidCart } from 'src/redux/slices'
import { useThrottle } from '~/Hook'
import { listFeatures } from 'src/components/fake-data'
import { lastestProduct } from 'src/components/fake-data/lastest-product'

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

interface Iimage {
    image_url: string
    is_thumbnail: boolean
}

interface IblogProduct {
    description: string
    image_url: string
    title: string
    id: number
    author: string
}

interface IProduct {
    followed: boolean
    id: string | number
    added_to_cart: boolean
}

export interface Iresponse {
    followed?: boolean
}

export const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<IpropProducts[]>([])
    const [latestProducts, setLatestProducts] = useState<IpropProducts[]>([])
    const [trendingProducts, setTrendingProducts] = useState<IpropProducts[]>([])
    const [blogs, setBlogs] = useState<IblogProduct[]>([])
    const [increment, setIncrement] = useState<number>(1)
    const [products, setProducts] = useState<any>([])
    const [runFunc, setRunFunc] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(false)
    const timer = useRef<any>()

    const handleGetAllProducts = () => {
        productApi.getFeaturedList()?.then((res) => setFeaturedProducts(res.data))
        productApi.getLatestList()?.then((res) => setLatestProducts(res.data))
        productApi.getTrendingProduct()?.then((res) => setTrendingProducts(res.data))
        blogApi.getList()?.then((res) => setBlogs(res.data))
    }

    const fetchingProducts = useRef<Array<number | string>>([])
    useEffect(handleGetAllProducts, [])

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const fakeData = ['delivery', 'cashback', 'premium', 'support']
    const token = useAppSelector((state) => state.auth.token)

    const throttle = useThrottle(increment, 2000)

    // useEffect(() => {
    //     if(increment===0){
    //         return
    //     }
    //     else if(increment % 2 === 0){
    //         console.log(increment)
    //     }
    //     else{
    //         console.log(increment)
    //     }
    // },[increment])

    // const debounce = _.debounce((number:number):any => {
    //     console.log(number)
    // },4000)
    // debounce(12)

    useEffect(() => {
        console.log(active)
        if (runFunc) {
            timer.current = setTimeout(() => {
                const followed = products.followed
                if (fetchingProducts.current.length === 0) {
                    const postApi = !active ? productApi.unFollow(products.id) : productApi.follow(products.id)
                    fetchingProducts.current.push(products.id)
                    postApi
                        ?.then((res: any) => {
                            const newProducts = featuredProducts.map((item) => {
                                if (item.id === products.id) {
                                    return {
                                        ...item,
                                        followed: res?.followed,
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
                            fetchingProducts.current = fetchingProducts.current.filter((id) => id !== products.id)
                        })
                }
            }, 2000)
        }
        return () => {
            clearTimeout(timer.current)
        }
    }, [active])

    const handleClickHeart = (product: IProduct, type: string) => {
        if (!token) {
            alert('You not login')
            navigate(config.routes.login)
            return
        }

        // setProducts(product)
        // setActive(!active)
        // setRunFunc(true)

        // // setIncrement(increment + 1)

        // // if (increment === throttle) {
        const followed = product.followed
        if (fetchingProducts.current.length === 0) {
            const postApi = followed ? productApi.unFollow(product.id) : productApi.follow(product.id)
            fetchingProducts.current.push(product.id)
            postApi
                ?.then((res: any) => {
                    const newProducts = featuredProducts.map((item) => {
                        if (item.id === product.id) {
                            return {
                                ...item,
                                followed: res?.followed,
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
        // }
    }

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

    console.log('featuredProducts', featuredProducts)

    return (
        <HomeStyle>
            <Slider />
            {/* <button onClick={()=>debounce(12)} >test</button> */}
            <div className="container-home-main d-flex">
                <div className="featured-product-container d-flex max-width">
                    <div className="title-featured-product text-title">Featured Products</div>
                    <div className="featured-products d-flex">
                        {listFeatures.data &&
                            listFeatures.data.length > 0 &&
                            listFeatures.data.map((product: any, index) => {
                                return (
                                    <FeaturedProduct
                                        key={index}
                                        name={product.name}
                                        code={product.code}
                                        price={product.price}
                                        img={product.images}
                                        id={product.id}
                                        handleClickHeart={() => handleClickHeart(product, 'featured')}
                                        followed={product.followed}
                                        // followed={active}
                                        added={product.added_to_cart}
                                        handleClickAddCart={() => handleClickAddCart(product, 'featured')}
                                    />
                                )
                            })}
                    </div>
                </div>
                <div className="latest-product-container d-flex max-width">
                    <div className="title-latest-product text-title">latest Products</div>
                    <div className="latest-products d-flex">
                        {lastestProduct.data &&
                            lastestProduct.data.length > 0 &&
                            lastestProduct.data.map((product: any, index) => {
                                return (
                                    <Link to={generatePath(config.routes.productDetail, { id: product.id })}>
                                        <LatestProduct
                                            key={index}
                                            name={product.name}
                                            price={product.price}
                                            images={product.images}
                                            discount={product.discount}
                                            followed={product.followed}
                                            description={product.description}
                                            handleClickHeart={() => handleClickHeart(product, 'latest')}
                                            added={product.added_to_cart}
                                            handleClickAddCart={() => handleClickAddCart(product, 'latest')}
                                        />
                                    </Link>
                                )
                            })}
                    </div>
                </div>
                <div className="shopex-offer-container d-flex max-width">
                    <div className="title-shopex-offer text-title">What Shopex Offer!</div>
                    <div className="shopex-offer d-flex">
                        {fakeData.map((item: string) => {
                            return <Offer type={item} />
                        })}
                    </div>
                </div>
            </div>
            <BannerSub />
            <div className="trending-product-container d-flex ">
                <div className="desciption-trending">Get Leatest Update By Subscribe Our Newslater</div>
                <Button text="Shop Now" btnWidth="173px" padding="12px 34px" radius="3px" />
                <div className="trending-title text-title">Trending Products</div>
                <div className="product-trending d-flex max-width">
                    {listFeatures.data &&
                        listFeatures.data.length > 0 &&
                        listFeatures.data.map((item: any) => {
                            return (
                                <TrendingProducts
                                    name={item.name}
                                    price={item.price}
                                    discount={item.discount}
                                    images={item.images}
                                    followed={item.followed}
                                />
                            )
                        })}
                </div>
            </div>
            <div className="container-img-wrap">
                <img className="img" src={rectangle} alt="" />
            </div>
            <div className="branches-container">
                <img src={Branches} alt="" className="img-branches" />
            </div>
            {/* <div className="container-latest-blog d-flex">
                <div className="title-blog-container text-title">Leatest Blog</div>
                <div className="latest-blog d-flex max-width">
                    {blogs &&
                        blogs.length > 0 &&
                        blogs.map((item: IblogProduct) => {
                            return (
                                <LatestBlog
                                    description={item.description}
                                    image_url={item.image_url}
                                    title={item.title}
                                    author={item.author}
                                />
                            )
                        })}
                </div>
            </div> */}
            <ToastContainer />
        </HomeStyle>
    )
}

const HomeStyle = styled.div<{}>`
    width: 100%;
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
        .latest-product-container {
            margin-top: 200px;
            flex-direction: column;
            align-items: center;
            width: 100%;
            .latest-products {
                width: 1140px;
                flex-wrap: wrap;
                justify-content: center;
                gap: 30px;
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
