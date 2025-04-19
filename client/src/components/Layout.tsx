import { Outlet } from "react-router-dom"
import Header from "./Header"
import Aside from "./Aside"
import Footer from "./Footer"

const Layout = () => {
    return (
        <div className="relative body-wrapper flex flex-col min-h-screen">

            <Header />
            <Aside />
            <main className="box-padding bg-slate-200 flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer />
            
        </div>
    )
}

export default Layout