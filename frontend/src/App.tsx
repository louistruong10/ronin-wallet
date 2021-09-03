import Loader from "components/Loader"
import { useState, lazy, Suspense, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom"
import DashboardContext from "context/DashboardContext"
import { useApiWithAuth } from "modules/api"
import { createBrowserHistory } from "history"

const SignIn = lazy(() => import("pages/LogIn"))
const Dashboard = lazy(() => import("pages/Dashboard"))
const Assets = lazy(() => import("pages/Assets"))

const App: React.FC = () => {
  const { get } = useApiWithAuth("/api/list")
  const [assetsList, setAssetsList] = useState(null)
  const history = createBrowserHistory()
  // const location = useLocation()
  const context = {
    assetsList,
    setAssetsList,
  }
  const setDataList = async () => {
    const res = await get()
    setAssetsList(res?.data ?? null)
  }

  useEffect(() => {
    if (localStorage.getItem("token")) setDataList()
  }, []) //eslint-disable-line

  const checkToken = () => {
    const isAuth = localStorage.getItem("token")
    return isAuth ? "/dashboard" : "/signin"
  }
  return (
    <DashboardContext.Provider value={context}>
      <Suspense fallback={<Loader size="large" />}>
        <Router>
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/assets">
              <Assets />
            </Route>
            <Route path="/">
              <Redirect to={checkToken()} />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </DashboardContext.Provider>
  )
}

export default App
