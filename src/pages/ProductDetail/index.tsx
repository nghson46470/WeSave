import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios'
import { ToastContainer, toast } from 'react-toastify'

import { ProductInfo } from './components/ProductInfo'
import { RelatedProductItem } from './components/RelatedProductItem'
import { Branches } from '~/assets'
import { config } from '~/config'
import { HeadingPage, Loading } from '~/components'
import { productApi } from '~/api'
import { IProductInfo } from '~/interfaces'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import { getUnpaidCart } from 'src/redux/slices'
import { useThrottle } from '~/Hook'
import { dataProductDetail, listFeatures, listProduct } from 'src/components/fake-data'
import { listClothes } from 'src/components/fake-data/list-clothes'
import { FeaturedProduct } from '../Home/components/FeaturedProduct'

const DESCRIPTION = 'description-detail'
const ADDITIONAL_INFO = 'additional-info'
const REVIEWS = 'review'
const VIDEO = 'video'

interface MoreInfo {
    video: string
    reviews: string
    description: string
    additional_info: string
}

interface Iresponse {
    data?: object
    more_info?: any
    related_products?: any
}

interface IProduct {
    followed: boolean
    id?: string | number
}

interface Response extends AxiosResponse {
    followed?: boolean
}
interface AxiosResponseAdditionalResultField<T = any, D = any> {
    data: T
    status: number
    statusText: string
    headers: AxiosResponseHeaders
    config: AxiosRequestConfig<D>
    request?: any
    followed?: boolean
    added_to_cart?: boolean
}

export const ProductDetail = () => {
    const [tab, setTab] = useState<string>(DESCRIPTION)
    const [relatedProducts, setRelatedProducts] = useState<IProductInfo[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [productInfo, setProductInfo] = useState<any>(dataProductDetail)
    const [moreInfo, setMoreInfo] = useState<MoreInfo>()
    const [increment, setIncrement] = useState<number>(1)
    const [imageCurren, setImageCurren] = useState<any>([])

    const dispatch = useAppDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const fetchingProducts = useRef<Array<number | string>>([])

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
            name: 'Product detail',
            path: config.routes.productDetail,
        },
    ]

    const handleGetProductDetail = () => {
        setLoading(true)
        productApi.getProductDetail(id)?.then((res: Iresponse & AxiosResponse) => {
            // setProductInfo(res.data)
            setMoreInfo(res.more_info)
            setRelatedProducts(res.related_products)
            setLoading(false)
        })
    }

    useEffect(handleGetProductDetail, [id])
    const token = useAppSelector((state) => state.auth.token)

    const renderContent = () => {
        switch (tab) {
            case DESCRIPTION:
                return <div>{moreInfo?.description}</div>
            case ADDITIONAL_INFO:
                return <div>{moreInfo?.additional_info}</div>
            case REVIEWS:
                return <div>{moreInfo?.reviews}</div>
            case VIDEO:
                return <video width="400" controls autoPlay={true} muted src={moreInfo?.video} />
            default:
        }
    }

    const throttle = useThrottle(increment, 2000)

    const handleClickHeart = (productInfo: any) => {
        if (!token) {
            alert('You are not Login')
            navigate(config.routes.login)
            return
        }
        setIncrement(increment + 1)

        if (increment === throttle) {
            const followed = productInfo.followed
            const postApi = followed ? productApi.unFollow(productInfo.id) : productApi.follow(productInfo.id)
            fetchingProducts.current.push(productInfo.id)

            postApi
                ?.then((res: Response) => {
                    const newProducts = {
                        ...productInfo,
                        followed: res?.followed,
                    }
                    setProductInfo(newProducts)
                })
                .catch(() => {
                    toast.error('Have an error.')
                })
                .finally(() => {
                    fetchingProducts.current = fetchingProducts.current.filter((id) => id !== productInfo.id)
                })
        }
    }

    const handleChangePage = (id: number | undefined) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        navigate(`/product-Detail/${id}`)
    }

    const handleAddCard = (productInfo: any) => {
        const added = productInfo.added_to_cart
        const postApi = added ? productApi.removeFromCart(productInfo.id) : productApi.addToCart(productInfo.id)

        if (!token) {
            alert('You not login')
            navigate(config.routes.login)
            return
        }

        postApi
            ?.then((res: AxiosResponseAdditionalResultField<any, any>) => {
                dispatch(getUnpaidCart())
                const newProducts = {
                    ...productInfo,
                    added_to_cart: res?.added_to_cart,
                }
                if (!added) {
                    toast.success('added to cart', { autoClose: 1500 })
                } else {
                    toast.success('Remove to cart', { autoClose: 1500 })
                }
                setProductInfo(newProducts)
            })
            .catch(() => {
                toast.error('Have an error.')
            })
            .finally(() => {
                fetchingProducts.current = fetchingProducts.current.filter((id) => id !== productInfo.id)
            })
    }

    // console.

    useEffect(() => {
        setImageCurren([])
    }, [id])

    const handleClickThumbnailImage = (id: string | number) => {
        const images = productInfo?.images

        const newImages =
            images &&
            images.map((image: any) => {
                if (image.id === id) {
                    return {
                        ...image,
                        is_thumbnail: true,
                    }
                } else {
                    return {
                        ...image,
                        is_thumbnail: false,
                    }
                }
            })

        setImageCurren(newImages)
    }

    console.log('ImageCurren', imageCurren)

    console.log('productInfo', productInfo)

    return (
        <>
            <HeadingPage title="Product Details" breadCrumbs={breadcrumb} />
            <ProductDetailStyle tab={tab}>
                <ProductInfo
                    name={productInfo?.name}
                    price={productInfo?.price}
                    images={imageCurren.length > 0 ? imageCurren : productInfo?.images}
                    discount={productInfo?.discount}
                    followed={productInfo?.followed}
                    handleClickHeart={() => handleClickHeart(productInfo)}
                    added_to_cart={productInfo?.added_to_cart}
                    handleAddCard={() => handleAddCard(productInfo)}
                    handleClickThumbnailImage={handleClickThumbnailImage}
                />
                <div className="info-product-detail-container d-flex">
                    <div className="info-product-detail-container-sub">
                        <div className="title-wrap d-flex">
                            <span className="description-detail" onClick={() => setTab(DESCRIPTION)}>
                                Description
                            </span>
                            <span className="additional-info" onClick={() => setTab(ADDITIONAL_INFO)}>
                                Additional Info
                            </span>
                            <span className="review" onClick={() => setTab(REVIEWS)}>
                                Reviews
                            </span>
                            <span className="video" onClick={() => setTab(VIDEO)}>
                                Video
                            </span>
                        </div>
                        <div className="description-wrap">{renderContent()}</div>
                    </div>
                </div>
                <div className="related-products-container d-flex">
                    <div className="title-related-products">Related Products</div>
                    <div className="related-products-wrap max-width">
                        {listFeatures.data &&
                            listFeatures.data.length > 0 &&
                            listFeatures.data.map((product: any, index) => {
                                return (
                                    <FeaturedProduct
                                        key={index}
                                        name={`clothes ${index+1}`}
                                        code={product.code}
                                        price={product.price}
                                        img={product.images}
                                        id={product.id}
                                        // handleClickHeart={() => handleClickHeart(product, 'featured')}
                                        followed={product.followed}
                                        // followed={active}
                                        added={product.added_to_cart}
                                        // handleClickAddCart={() => handleClickAddCart(product, 'featured')}
                                    />
                                )
                            })}
                    </div>
                </div>
                <div className="branches-img-wrap">
                    <img src={Branches} alt="" />
                </div>
                <ToastContainer />
                {loading && (
                    <div className="loading-wrap">
                        <Loading size="80px" />
                    </div>
                )}
            </ProductDetailStyle>
        </>
    )
}

const ProductDetailStyle = styled.div<{
    tab: string
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .info-product-detail-container {
        width: 100%;
        background: #f9f8fe;
        justify-content: center;
        min-height: 350px;
        .info-product-detail-container-sub {
            width: 1140px;
            padding: 100px 0px;
            .title-wrap {
                gap: 60px;
                color: var(--blue);
                font-size: 24px;
                line-height: 28px;
                font-weight: 600;
                span {
                    cursor: pointer;
                }
            }
            .description-wrap {
                margin-top: 60px;
            }
        }
    }
    .${(p) => p.tab} {
        text-decoration: underline;
    }
    .related-products-container {
        margin-top: 126px;
        flex-direction: column;
        width: 1140px;
        .title-related-products {
            color: var(--blue);
            font-size: 36px;
            line-height: 42px;
            font-weight: 700;
        }
        .related-products-wrap {
            margin-top: 50px;
            width: 100%;
            /* align-self: center; */
            display: flex;
            justify-content: center;
            gap: 30px;
            /* justify-content: space-between; */
        }
    }
    .branches-img-wrap {
        margin: 100px 0px;
        width: 60%;
        img {
            width: 100%;
        }
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
