import React from 'react'

function Social() {
    return (
        <>
            <div className="w-4/5 mx-auto">
                <div>
                    <button className="mt-4 border p-2 flex justify-center items-center gap-2 mx-auto rounded-lg w-4/5 hover:bg-gray-100 hover:border-gray-50 transition-all"><img width="32" height="32" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo" />Sign with Google</button>
                </div>
                <div className="mt-7 flex items-center gap-4">
                    <hr className="w-1/2 h-[1px] bg-gray-300" />
                    <span>Or</span>
                    <hr className="w-1/2 h-[1px] bg-gray-300" />
                </div>
            </div>
        </>
    )
}

export default Social
