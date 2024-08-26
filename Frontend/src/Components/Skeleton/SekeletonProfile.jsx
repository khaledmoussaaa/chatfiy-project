import React from 'react'
import Skeleton from 'react-loading-skeleton'

function SekeletonProfile(props) {
    return (
        <Skeleton circle width={props.width} height={props.height}/>
    )
}

export default SekeletonProfile
