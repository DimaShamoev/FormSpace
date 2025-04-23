import React from 'react'

const LoadingPage: React.FunctionComponent = () => {
    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
            <div className="load border-[10px] border-l-white animate-spin h-[200px] w-[200px] rounded-[50%]"></div>
        </div>
    )
}

export default LoadingPage