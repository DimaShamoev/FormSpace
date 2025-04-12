import { Outlet } from "react-router-dom"
import Header from "./Header"
import Aside from "./Aside"

const Layout = () => {
    return (
        <div className="relative body-wrapper flex flex-col min-h-screen">

            <Header />
            <Aside />
            <main className="box-padding bg-slate-200 layout flex-1 flex flex-col">
                <Outlet />
            </main>

            <footer>
                Footer
            </footer>
            
        </div>
    )
}

export default Layout