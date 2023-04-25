import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import styled from 'styled-components'

import {
    MailIcon,
    MobileIcon,
    ArrowDownIcon,
    UserIcon,
    HeartIcon,
    CartIcon,
    Button,
    ArrowIcon,
    LoadingDot,
    LogoutIcon,
} from '~/components'
import { SearchResult } from './SearchResult'
import { useDebounce } from '~/Hook'
import { config } from '~/config'
import { productApi } from 'src/api'
import { toast } from 'react-toastify'
import { useAppSelector, useAppDispatch } from '~/redux/hook'
import { getUnpaidCart, logout } from 'src/redux/slices'
import { Iimage } from '~/interfaces'
import { Tippy } from 'src/components/tippy'
import { listCart } from 'src/components/fake-data/list-clothes'
import { logo1 } from '~/assets'

interface IProduct {
    id: number
}

interface IonKeyDown {
    key: string
}

interface IPropSearch {
    name?: string
    price?: number
    images?: Array<Iimage>
    id: number
    handleClick?: () => void
}

interface IuserInfo {
    name: string
}

export const Header = ({ headerStyle = {} }) => {
    const [textSearch, setTextSearch] = useState<string>('')
    const [products, setProducts] = useState<IProduct[]>([])
    const [nameUser, setNameUser] = useState<string | null>('login')
    const [loading, setLoading] = useState<boolean>(false)
    const [showNotFound, setShowNotFound] = useState<boolean>(false)
    // const [showNotFound, setShowNotFound] = useState<boolean>(false)
    const location = useLocation()
    const navigate = useNavigate()

    let checkLogin = useRef<string>(config.routes.login)

    const dispatch = useAppDispatch()

    const token = useAppSelector((state) => state.auth.token)

    const carts = useAppSelector((state) => state.cart.products)

    useEffect(() => {
        setTextSearch('')
    }, [location.pathname])

    const handleGetProduct = () => {
        if (textSearch.trim()) {
            setLoading(true)
            productApi.getProduct(textSearch)?.then((res: AxiosResponse) => {
                setLoading(false)
                setProducts(res.data)
                if (res.data.length === 0) {
                    setShowNotFound(true)
                } else {
                    setShowNotFound(false)
                }
            })
        } else {
            setProducts([])
        }
        return setShowNotFound(false)
    }

    const userInfo: IuserInfo | any = useAppSelector((state) => state.auth.userInfo)

    useDebounce(handleGetProduct, textSearch, 300)

    const handleSearch = () => {
        if (textSearch.trim()) {
            navigate(config.routes.searchResult + '?q=' + textSearch)
            setTextSearch('')
        }
    }

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap()
            dispatch(getUnpaidCart())
            toast.success('Logout Success', { autoClose: 1000 })
            setNameUser('login')
            if (location.pathname === config.routes.home) {
                window.scrollTo({ top: 0 })
            }
            navigate(config.routes.home)
        } catch (err) {
            toast.error('Have an error.')
        }
    }

    useEffect(() => {
        if (userInfo?.name?.trim()) {
            setNameUser(userInfo?.name)
            checkLogin.current = config.routes.home
        } else {
            checkLogin.current = config.routes.login
        }
    }, [userInfo?.name])

    const handlePageChange = (id: number) => {
        setTextSearch('')
        navigate(`/product-Detail/${id}`)
    }

    const handleKeyPress = (event: IonKeyDown) => {
        if (event.key === 'Enter' && textSearch.trim()) {
            handleSearch()
        }
    }

    return (
        <HeaderStyles checkToken={token} textSearch={textSearch} {...headerStyle}>
            <div className="heading-bar-container align-center">
                <div className="heading-bar-container_sub">
                    <div className="heading-contact-wrap d-flex ">
                        <div className="mail-wrap d-flex align-center">
                            <MailIcon />
                            <p>wesaveall@gmail.com</p>
                        </div>
                        <div className="mobile-wrap d-flex align-center">
                            <MobileIcon />
                            <p>(12345)67890</p>
                        </div>
                    </div>
                    <div className="heading-bar-list d-flex">
                        <div className="english-wrap d-flex align-center">
                            <p>English</p>
                            <ArrowDownIcon />
                            <div className="tieng-viet" onClick={handleLogout}>
                                Tiếng việt
                            </div>
                        </div>
                        <div className="usd-wrap d-flex align-center">
                            <p>USD</p>
                            <ArrowDownIcon />
                        </div>
                        <Link to={checkLogin.current} className="login-wrap d-flex align-center">
                            <p className="login">{nameUser}</p>
                            <UserIcon />
                            {token && (
                                <div className="logout" onClick={handleLogout}>
                                    Logout <LogoutIcon />
                                </div>
                            )}
                        </Link>
                        <div className="wishlist-wrap d-flex align-center">
                            <p>Wishlist</p>
                            <HeartIcon />
                        </div>
                        <div className="cart-wrap d-flex align-center">
                            <Link to={config.routes.cart}>
                                <CartIcon />
                                {listCart.length > 0 &&
                                    !!(
                                        location.pathname !== config.routes.cart &&
                                        location.pathname !== config.routes.payment
                                    ) &&
                                    token && (
                                        <div className="quantity-products">
                                            {listCart.length <= 9 ? listCart.length : '9+'}
                                        </div>
                                    )}
                            </Link>
                            {!!(
                                location.pathname !== config.routes.cart && location.pathname !== config.routes.payment
                            ) && (
                                <div className="cart-sub-wrap">
                                    {token &&
                                        listCart &&
                                        listCart.length > 0 &&
                                        // eslint-disable-next-line array-callback-return
                                        listCart.map((cart: any, index) => {
                                            if (index < 3) {
                                                return (
                                                    <SearchResult
                                                        key={index}
                                                        type="cart"
                                                        image={cart?.thumbnail_url}
                                                        nameProduct={cart?.name}
                                                        priceProduct={cart?.price}
                                                        amount={cart?.amount}
                                                        handleClick={() => handlePageChange(cart?.id)}
                                                    />
                                                )
                                            }
                                        })}
                                    {listCart.length > 0 && token ? (
                                        listCart.length <= 3 ? (
                                            <div className="go-to-cart" onClick={() => navigate(config.routes.cart)}>
                                                Go to carts <ArrowIcon color="black" className="arrow-icon" />
                                            </div>
                                        ) : (
                                            <div className="go-to-cart" onClick={() => navigate(config.routes.cart)}>
                                                More {carts.length - 3} products ...{' '}
                                                <ArrowIcon color="black" className="arrow-icon" />
                                            </div>
                                        )
                                    ) : (
                                        token && <div className="not-product">Not product</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav-header-container d-flex align-center">
                <div className="nav-header-sub-container d-flex align-center">
                    {/* <p className="title" onClick={() => navigate('/')}>
                        Hekto
                    </p> */}

                    {
                        // eslint-disable-next-line jsx-a11y/alt-text
                        <img onClick={() => navigate('/')} src={logo1} style={{ width: '50px', height: '50px' }} />
                    }
                    <div className="header-router-page d-flex">
                        <NavLink
                            className={({ isActive }) => (isActive ? 'isActive' : 'header-page-item')}
                            to={config.routes.home}
                        >
                            Home
                        </NavLink>
                        <Tippy
                            listItem={
                                <div className="container-menu-sub">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'isActive ' : 'color-white')}
                                        to={config.routes.clothes}
                                        style={{
                                            display: 'block',
                                        }}
                                    >
                                        Clothing
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'isActive' : 'color-white')}
                                        to={config.routes.homeWare}
                                        style={{
                                            display: 'block',
                                            color: 'white',
                                        }}
                                    >
                                        Furniture
                                    </NavLink>
                                    <div className="color-white">Cosmetics</div>
                                    <div className="color-white">Electronice device</div>
                                    <div className="color-white">Books</div>
                                </div>
                            }
                        >
                            <div
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                Products
                            </div>
                        </Tippy>
                        {/* <NavLink
                            className={({ isActive }) => (isActive ? 'isActive' : 'header-page-item')}
                            to={config.routes.Page404}
                        >
                            Products
                        </NavLink> */}
                        <NavLink
                            className={({ isActive }) => (isActive ? 'isActive' : 'header-page-item')}
                            to={config.routes.events}
                        >
                            Events
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'isActive' : 'header-page-item')}
                            to={config.routes.verifiedShop}
                        >
                            Verified shops
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'isActive' : 'header-page-item')}
                            to={config.routes.aboutUs}
                        >
                            About us
                        </NavLink>
                    </div>
                </div>
                <div className="nav-header-searcch-container d-flex" tabIndex={1}>
                    <input
                        type="text"
                        className="input-search"
                        onChange={(e) => setTextSearch(e.target.value)}
                        placeholder="search..."
                        value={textSearch}
                        onKeyDown={handleKeyPress}
                    />
                    <Button Icon="search" onClick={handleSearch} />
                    {loading ? (
                        <div className="loading">
                            <LoadingDot />
                        </div>
                    ) : (
                        <div className="search-result-container">
                            {products &&
                                products.length > 0 &&
                                products.map((product: IPropSearch, index) => (
                                    <SearchResult
                                        key={index}
                                        image={product?.images}
                                        nameProduct={product.name}
                                        priceProduct={product.price}
                                        id={product.id}
                                        handleClick={() => handlePageChange(product.id)}
                                    />
                                ))}
                        </div>
                    )}
                    {textSearch.trim() && !loading && showNotFound && (
                        <div className="search-result-container not-product">Not found product</div>
                    )}
                </div>
            </div>
        </HeaderStyles>
    )
}

const HeaderStyles = styled.div<{
    checkToken?: string
    textSearch: string
}>`
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 8px 20px rgba(50, 32, 138, 0.117);
    .heading-bar-container {
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: #0c3b25;
    }
    .heading-bar-container_sub {
        height: 44px;
        display: flex;
        justify-content: space-between;
        color: white;
        width: 1140px;
        .heading-contact-wrap {
            gap: 50px;
            .mail-wrap,
            .mobile-wrap {
                gap: 10px;
            }
        }
        .heading-bar-list {
            gap: 20px;
            .english-wrap,
            .usd-wrap,
            .login-wrap,
            .wishlist-wrap {
                gap: 3px;
                cursor: pointer;
            }
            .login-wrap {
                min-width: 60px;
                position: relative;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    height: 10px;
                }
                &:hover .logout {
                    transform: scale(1);
                }
            }
            .english-wrap {
                min-width: 60px;
                position: relative;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    height: 10px;
                }
                &:hover .tieng-viet {
                    transform: scale(1);
                }
            }
        }
    }
    .color-white {
        color: white;
        font-size: 18px;
        font-weight: 500;
        border-bottom: 1px solid #e4e4e467;
    }
    .nav-header-container {
        padding: 20px 0px;
        /* display: flex; */
        justify-content: space-between;
        width: 1140px;
        .nav-header-sub-container {
            gap: 88px;
            .title {
                cursor: pointer;
                font-weight: 700;
                font-size: 34px;
                line-height: 40px;
            }
            .header-router-page {
                gap: 35px;
                .header-page-item {
                    color: black;
                    height: 22px;
                    &:hover {
                        border-bottom: 2px solid #0c3b252d;
                        box-sizing: border-box;
                    }
                }
            }
        }
        .nav-header-searcch-container {
            position: relative;
            width: 320px;
            &:focus > .search-result-container {
                display: block !important;
            }
            .input-search {
                flex-grow: 1;
                border: 2.5px solid #e7e6ef;
                outline: #ffffff;
                font-size: large;
                transition: 0.2s;
                padding-left: 5px;
                &:focus {
                    border: 2.5px solid var(--primary);
                }
                &:focus ~ .search-result-container {
                    display: block;
                }
            }
            .search-result-container {
                box-shadow: 0px 8px 20px rgba(50, 32, 138, 0.117);

                z-index: 3;
                width: 100%;
                position: absolute;
                top: 100%;
                left: 0.5px;
                /* display: ${(p) => (p.textSearch.length !== 0 ? 'block' : 'none')}; */
                display: none;
                background-color: #ffffff;
            }
            .loading {
                z-index: 3;
                position: absolute;
                width: 100%;
                top: 100%;
                display: flex;
                left: 0.5px;
                justify-content: center !important;
                align-items: center !important;
                background-color: #ffffff;
            }
        }
    }
    a {
        text-decoration: none;
        color: #ffffff;
    }
    .isActive {
        color: var(--primary);
    }

    .logout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        width: 120px;
        background-color: white;
        z-index: 3;
        top: 33px;
        padding: 10px;
        color: black;
        border: 1px solid #0c3b253f;
        transform: scale(0);
        transform-origin: top left;
        transition: 0.2s;
        &:hover {
            background-color: #e4e4e4;
        }
    }
    .tieng-viet {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        width: 120px;
        background-color: white;
        z-index: 3;
        top: 33px;
        padding: 10px;
        color: black;
        border: 1px solid #0c3b253f;
        transform: scale(0);
        transform-origin: top left;
        transition: 0.2s;
        &:hover {
            background-color: #e4e4e4;
        }
    }
    .cart-wrap {
        position: relative;

        &:hover .cart-sub-wrap {
            /* display: inline-block; */
            transform: scale(1);
        }

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 100%;
            left: -51px;
            right: 0px;
            height: 15px;
            width: 71px;
        }
        &:hover .search-result-container {
            display: none;
        }
        .cart-sub-wrap {
            color: black;
            position: absolute;
            background-color: #f3f3f3;
            /* top: 200%; */
            top: 33px;
            right: 0px;
            z-index: 4;
            width: 320px;
            /* display: none; */
            transform: scale(0);
            transform-origin: top right;
            transition: 0.2s;
            /* max-height: 250px;
            overflow-y: auto;
            &::-webkit-scrollbar {
                width: 8px;
                background-color: red;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background-color: black;
            } */
        }
        .go-to-cart {
            display: flex;
            justify-content: center;
            text-align: center;
            height: 50px;
            background-color: #88888892;
            line-height: 50px;
            cursor: pointer;
            transform: 0.3;
            font-weight: 600;
            position: -webkit-sticky;
            position: sticky;
            top: 250px;
            &:hover {
                opacity: 0.6;
                text-decoration: underline;
            }
            .arrow-icon {
                transform: rotate(180deg);
                align-self: center;
                margin-left: 15px;
                line-height: 50px;
                /* opacity: 0; */
                transition: 0.4;
            }
        }
        .quantity-products {
            line-height: 20px;
            /* text-align: center; */
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0px;
            right: -10px;
            width: 20px;
            height: 20px;
            background-color: var(--primary);
            font-size: small;
            border-radius: 50%;
        }
    }
    .not-product {
        height: 50px;
        background-color: #88888892;
        text-align: center;
        line-height: 50px;
        opacity: 0.8;
        cursor: default;
    }
    .container-menu-sub {
        width: 250px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 10px;
    }
`
