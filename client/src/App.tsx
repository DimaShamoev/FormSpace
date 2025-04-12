import { FunctionComponent, useEffect } from "react"
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { logOut, login } from "./store/user/userSlice";
import { AuthService } from "./services/auth/auth.service";
import { getToken } from "./helpers/localstorage/localstorage.helper";
import { useAppDispatch } from "./store/hook";

const App: FunctionComponent = () => {

    const dispatch = useAppDispatch()

    const checkAuth = async () => {
        const token = getToken()

        try {
            if (token) {
                const data = await AuthService.getProfile()

                if(data) {
                    dispatch(login(data))
                } else {
                    dispatch(logOut())
                }
            }
        } catch(err) {
            console.log(err)
        }

    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div className="App cont">
            <RouterProvider router={routes} />
        </div>
    )
}

export default App;