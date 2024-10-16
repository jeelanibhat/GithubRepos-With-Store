
const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-16 h-16 animate-spin rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0 bg-white rounded-full m-1"></div>
            </div>
        </div>

    )
}

export default LoadingPage