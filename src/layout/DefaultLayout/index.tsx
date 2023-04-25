import { config } from '~/config'
import { Footer, Header } from '~/modules'
import { useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ScrollTop } from './component/ScrollTop'

export const DefaultLayout = (props: { children: JSX.Element }) => {
    const [scrollTop, setScrollTop] = useState<boolean>(false)

    const { children } = props
    let location = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0 })
        if (
            location.pathname === config.routes.payment ||
            location.pathname === config.routes.cart ||
            location.pathname === config.routes.login
        ) {
            window.scrollTo({ top: 400, behavior: 'smooth' })
        }
    }, [location.pathname])

    const handleScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.onscroll = () => {
        if (window.scrollY >= 2000) {
            setScrollTop(true)
        } else {
            setScrollTop(false)
        }
    }

    return (
        <div onScroll={handleScroll}>
            <Header headerStyle={{marginBottom:'100px'}} />
            {children}
            <Footer />
            <ScrollTop onClick={handleScroll} scrollTop={scrollTop} />
        </div>
    )
}
