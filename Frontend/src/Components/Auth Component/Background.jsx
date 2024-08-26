import React from 'react'

function Background(props) {
    return (
        <div className="w-1/2 p-10 hidden xl:flex xl:items-center xl:justify-center">
            <img src={`/src/assets/images/${props.path}`} alt="Background Auth" />
        </div>
    )
}

export default Background
