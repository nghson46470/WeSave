import React from 'react'
import styled from 'styled-components'

export const Tippy = (props:any) => {
  const {children,listItem} = props
    return (
        <TippyStyle>
            <div className='container' >
                {children}
            <div className='item-container' >
                    {listItem}
            </div>
            </div>

        </TippyStyle>
  )
}


const TippyStyle = styled.div<{}>`
    .container{
        position: relative;
    }
    .container:hover .item-container{
        display: flex;
        flex-direction: column;
        gap: 8px;
        
    }
    .item-container{
        position: absolute;
        display: none;
        background: fixed;
        background-color: #0c3b25;
        padding: 8px;
    }
`
