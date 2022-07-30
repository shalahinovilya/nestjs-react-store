import {BrowserRouter as Browser} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthRoutes, UnAuthRoutes} from "./routes";
import NavBarComponent from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import './static/AuthPath.css'
import './static/SideBar.css'
import './static/CatalogSettings.css'
import './static/DetailPage.css'
import {checkAuth} from "./http/userHttp";
import {Spinner} from "react-bootstrap";


const App = observer(() => {

    const [isLoading, setIsLoading] = useState(true)
    const AuthApp = AuthRoutes()
    const UnAuthApp = UnAuthRoutes()
    const {user} = useContext(Context)

    useEffect(() => {
        checkAuth().then((data) => {
            const {token, ...userData} = data
            user.setIsAuth(true)
            user.setUser(userData)
        }).finally((() => setIsLoading(false)))
    }, [])


    if (isLoading) {
        return (<div className="loading-block">
            <Spinner className="loading-spinner" animation="grow" variant="primary" />
            </div>)
    }

    return (
        <div>
            <Browser>
                <NavBarComponent/>
                {user.getIsAuth() && AuthApp || UnAuthApp}
            </Browser>

        </div>
    );
})

export default App;
