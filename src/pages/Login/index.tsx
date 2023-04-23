import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { LoadingIcon } from 'src/components/icons'
import { authApi } from '~/api'
import { BranchesList, Button, HeadingPage, Input, Loading } from '~/components'
import { config } from '~/config'

import 'react-toastify/dist/ReactToastify.css'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import { getUnpaidCart, login, register } from 'src/redux/slices'

interface IinitValue {
    name: string
    email: string
    password: string
    confirmPassword: string
}

interface Iresponse {
    token: string
}

export const Login = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(true)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const selector = useAppSelector((state) => state.auth)


    const initialValues: IinitValue = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

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
            name: 'My account',
            path: config.routes.login,
        },
    ]

    console.log(selector)

    const { values, touched, handleChange, handleSubmit, errors, resetForm } = useFormik({
        initialValues,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                if (isLogin) {
                    let body = {
                        email: values.email,
                        password: values.password,
                    }
                    await dispatch(login(body)).unwrap()
                    dispatch(getUnpaidCart())
                    toast.success('Login success', { autoClose: 1000 })
                    setTimeout(() => {
                        navigate(config.routes.home)
                        setLoading(false)
                    }, 1000)
                } else {
                    let body = {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                    }
                    await dispatch(register(body)).unwrap()
                    toast.success('Sign Up Success', { autoClose: 1000 })
                    setLoading(false)
                    setIsLogin(true)
                }
            } catch (err: any) {
                toast.error(err?.message, { autoClose: 1000 })
                setLoading(false)
            }
        },
        validationSchema: yup.object().shape({
            name: yup.string().test({
                name: 'Validate required',
                message: 'Name is required.',
                test: (value) => {
                    if (isLogin) {
                        return true
                    }
                    return !!value?.trim()
                },
            }),
            email: yup.string().required('Email is required.').email('Email is invalid.'),
            password: yup.string().required('Password is required.').min(8, 'Min length is 8 characters.'),
            confirmPassword: yup.string().test({
                name: 'Validate password match',
                message: 'Password not match.',
                test: (value, formState) => {
                    if (isLogin) {
                        return true
                    }

                    const password = formState.parent.password
                    return value === password
                },
            }),
        }),
    })

    useEffect(() => {
        if (values.password || values.email || values.confirmPassword || values.name) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [values])

    useEffect(() => {
        resetForm()
        setLoading(false)
        window.scrollTo({top:370,behavior:'smooth'})
    }, [isLogin])


    const handleDisabled = () => {
        return
    }


    return (
        <>
            <HeadingPage title="My Account" breadCrumbs={breadcrumb} />
            <LoginStyle className="d-flex ">
                <div className="wrap-form-login d-flex">
                    <div className="container-login d-flex ">
                        <div className="container-title d-flex ">
                            <p className="title-main">{isLogin ? 'Login' : 'Register'}</p>
                            <p className="description-login">Please login using account detail bellow.</p>
                        </div>
                        <div className="form-input-container">
                            {!isLogin && (
                                <Input
                                    label="Name"
                                    radius="2px"
                                    name="name"
                                    value={values.name}
                                    error={errors.name}
                                    touched={touched.name}
                                    onChange={handleChange}
                                />
                            )}
                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                radius="2px"
                                value={values.email}
                                error={errors.email}
                                touched={touched.email}
                                onChange={handleChange}
                            />
                            <Input
                                label="Password"
                                type="password"
                                radius="2px"
                                name="password"
                                value={values.password}
                                error={errors.password}
                                touched={touched.password}
                                onChange={handleChange}
                            />
                            {!isLogin && (
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    radius="2px"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    error={errors.confirmPassword}
                                    touched={touched.confirmPassword}
                                    onChange={handleChange}
                                />
                            )}
                            {isLogin && <p className="description-password">Forgot your password?</p>}
                            <Button
                                text={isLogin ? "Login" : "Register"}
                                btnWidth="100%"
                                radius="3px"
                                padding="14px 0px"
                                onClick={disable ? handleDisabled : handleSubmit}
                                disabled={disable}
                            />
                            <p className="description-create-account" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Don’t have an Account?Create account' : 'Do you already an account?Login'}
                            </p>
                        </div>
                    </div>
                </div>
                {loading && (
                    <div className="loading-wrap">
                        <Loading size="80px" />
                    </div>
                )}
            </LoginStyle>
            <BranchesList />
            <ToastContainer />
        </>
    )
}

const LoginStyle = styled.div<{}>`
    width: 100%;
    justify-content: center;
    .wrap-form-login {
        margin: 120px 0px;
        width: 544px;
        min-height: 474px;
        box-shadow: 0px 0px 25px 10px #f8f8fb;
        justify-content: center;
        .container-login {
            padding: 50px 0px;
            width: 432px;
            align-items: center;
            flex-direction: column;
            gap: 37px;
            .container-title {
                align-items: center;
                flex-direction: column;
                .title-main {
                    font-size: 32px;
                    line-height: 38px;
                    font-weight: 700;
                }
                .description-login {
                    margin-top: 7px;
                    font-weight: 400;
                    font-size: 17px;
                    line-height: 20px;
                    color: #9096b2;
                }
            }
            .form-input-container {
                display: flex;
                flex-direction: column;
                gap: 23px;
                width: 100%;
                p {
                    font-weight: 400;
                    font-size: 17px;
                    line-height: 20px;
                    color: #9096b2;
                    &:hover {
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
                .description-create-account {
                    text-align: center;
                }
            }
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
