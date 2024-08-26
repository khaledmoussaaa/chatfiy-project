import React from 'react'
import Skeleton from 'react-loading-skeleton'

function SekeletonRow(props) {
    return (
        <Skeleton width={props.width} height={props.height} borderRadius={25} count={3} className='mb-10'/>
    )
}

export default SekeletonRow
