import React from 'react'
import Skeleton from 'react-loading-skeleton'

function SekeletonTables(props) {
    const skeletonItems = Array.from({ length: props.length }).map((_, index) => (

        <div key={index} className='flex justify-between items-center p-2 border-b'>
            <div>
                <Skeleton className='mb-2' width={250} height={15} borderRadius={25} />
                <Skeleton width={500} height={10} borderRadius={25} />
            </div>
            <div>
                <Skeleton width={100} height={10} borderRadius={25} />
            </div>
        </div>
    ));
    return (
        <>
            <div className='shadow-md rounded-lg'>
                {skeletonItems}
            </div>
        </>
    )
}

export default SekeletonTables
