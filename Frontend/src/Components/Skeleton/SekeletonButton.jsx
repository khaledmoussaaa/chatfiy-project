import React from 'react'
import Skeleton from 'react-loading-skeleton'

function SekeletonButton(props) {
    return (
        <Skeleton width={props.width} height={props.height} borderRadius={15}/>
    )
}

export default SekeletonButton
