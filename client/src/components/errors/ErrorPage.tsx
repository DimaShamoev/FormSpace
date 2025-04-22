import { useNavigate } from "react-router-dom"
import Footer from "../Footer"
import Header from "../Header"

const ErrorPage: React.FunctionComponent = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col flex-1 gap-2 bg-slate-200 box-padding items-center justify-center">
                <div className="error-code text-6xl font-bold">404</div>
                <div className="warn text-4xl">That Page Doesn't Exist</div>
                <div className="warn text-sm">Sorry, The Page You Were Looking For Couldn't Be Found</div>
                <div className="return">
                    <button
                        className="bg-blue-500 text-white sm-padding_1 rounded-sm cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        Go Back
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ErrorPage