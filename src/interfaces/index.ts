import React, { SyntheticEvent } from 'react'
import { CSSProperties } from 'styled-components'

export interface IBaseIcon {
    width?: number | string
    height?: number | string
    size?: number
    color?: string
    onClick?: () => void | undefined
    disabled?: boolean
    className?: string
}

export interface IButton {
    className?: string
    onClick?: () => void
    disabled?: boolean
    btnColor?: string 
    text?: string
    icon?: JSX.Element | JSX.Element[]
    style?: CSSProperties
    children?: JSX.Element | JSX.Element[] | string
    btnWidth?: string
    btnHeight?: string
    Icon?: 'dot' | 'search' | 'normal'
    radius?: string
    padding?: string
    font?: 'Philosopher' | 'jose'
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>
}

export interface IPropInput {
    id ?: string
    label?: string
    error?: string
    className?: string
    touched?: boolean
    radius?: string
    name?: string
    type?: string
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
}

export interface Iimage {
    image_url: string
    is_thumbnail: boolean
    id : string
}

export interface IProductInfo {
    id?:any
    name?: string
    price?: number
    images?: Iimage[]
    discount?: number
    followed?: boolean
    handleClickHeart? : ()=>void | undefined
    handleAddCard? : ()=>void | undefined
    onClick?:()=>void
    handleClickThumbnailImage?:(id : string | number) => void;
    added_to_cart?: boolean
}
