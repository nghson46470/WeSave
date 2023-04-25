import { config } from '~/config'
import {
    Home,
    AboutUs,
    Cart,
    Login,
    OderCompleted,
    Payment,
    ProductDetail,
    Register,
    SearchResult,
    NotFound,
} from '~/pages'
import { DefaultLayout } from '~/layout'
import { ClothesPage } from 'src/pages/clothes'
import { HomeWare } from 'src/pages/home-ware'
import { VerifiedShop } from 'src/pages/verified-shop'
import { ProfileShopPage } from 'src/pages/profile-shop'
import { EventPage } from 'src/pages/events'

export const routes = [
    { layout: DefaultLayout, path: config.routes.home, element: Home },
    { layout: DefaultLayout, path: config.routes.aboutUs, element: AboutUs },
    { layout: DefaultLayout, path: config.routes.cart, element: Cart, isPrivate: true },
    { layout: DefaultLayout, path: config.routes.login, element: Login, isPrivate: true },
    {
        layout: DefaultLayout,
        path: config.routes.oderCompleted,
        element: OderCompleted,
        isPrivate: true,
    },
    { layout: DefaultLayout, path: config.routes.payment, element: Payment, isPrivate: true },
    {
        layout: DefaultLayout,
        path: config.routes.productDetail,
        element: ProductDetail,
    },
    { layout: DefaultLayout, path: config.routes.Page404, element: NotFound },
    { layout: DefaultLayout, path: config.routes.register, element: Register },
    {
        layout: DefaultLayout,
        path: config.routes.searchResult,
        element: SearchResult,
    },
    {
        layout: DefaultLayout,
        path: config.routes.homeWare,
        element: HomeWare,
    },
    {
        layout: DefaultLayout,
        path: config.routes.clothes,
        element: ClothesPage,
    },
    {
        layout: DefaultLayout,
        path: config.routes.verifiedShop,
        element: VerifiedShop,
    },
    {
        layout: DefaultLayout,
        path: config.routes.profile,
        element: ProfileShopPage,
    },
    {
        layout: DefaultLayout,
        path: config.routes.events,
        element: EventPage,
    },
]
