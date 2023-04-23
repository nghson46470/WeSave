import { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

import { routes } from '~/routes'
import { VerifyLogin } from '~/layout';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { getUserInfo, getUnpaidCart} from './redux/slices';

function App() {

    const dispatch = useAppDispatch();
    const token= useAppSelector((state)=>state.auth.token)
    
    useEffect(() => {
        if(token){
            dispatch(getUserInfo());
            dispatch(getUnpaidCart())
        }
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                {routes.map((route, index) => {
                    const Element = route.element
                    const isPrivate = route?.isPrivate
                    const Layout = route.layout ? route.layout : Fragment
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <>
                                        {isPrivate && <VerifyLogin/>}
                                        <Element />
                                    </>
                                </Layout>
                            }
                        />
                    )
                })}
            </Routes>
        </Router>
    )
}

export default App
