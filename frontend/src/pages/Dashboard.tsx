import { memo, useEffect, useState, useContext } from "react"
import { Row, Col, Badge, Button, Divider, Skeleton } from "antd"
import { Link, useLocation, useHistory } from "react-router-dom"
import UserSvg from "components/Icon/UserSvg"
import WalletLogo from "assets/wallet-logo.png"
import WalletIconSvg from "components/Icon/WalletIconSvg"
import CreditCardSvg from "components/Icon/CreditCardSvg"
import SendSvg from "components/Icon/SendSvg"
import { useApiWithAuth } from "modules/api"
import RepeatSvg from "components/Icon/RepeatSvg"
import { formatCurrency } from "modules/common"
import AssetsList from "components/AssetsList"
import DashboardContext from "../context/DashboardContext"

const Dashboard: React.FC = () => {
  const { get } = useApiWithAuth("/api/list")

  const { pathname } = useLocation()
  const history = useHistory()
  const { assetsList, setAssetsList } = useContext(DashboardContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(!assetsList)
  }, [assetsList]) //eslint-disable-line

  const getDataList = async () => {
    const res = await get()
    setAssetsList(res?.data ?? null)
  }

  useEffect(() => {
    if (history.action === "REPLACE" && !assetsList) getDataList()
    const isAuth = localStorage.getItem("token")
    if (!isAuth) history.replace("/signin")
  }, [pathname, history]) //eslint-disable-line

  return (
    <div className="dashboard-page">
      <Row className="header pb-20" align="middle">
        <Col flex="auto">
          <div className="user-name d-flex align-items-center">
            <Badge status="processing" />
            <p className="font-weight-700">Ronin Wallet</p>
          </div>
        </Col>
        <Col flex="32px" className="user-icon">
          <Button type="default" icon={<UserSvg />} size="middle" />
        </Col>
      </Row>
      <div className="body">
        <Row className="wallet">
          <Col span={24} className="p-5">
            <Row className="pb-3">
              <Col flex="auto" className="d-flex">
                <h5 className="text-white mr-2">My Wallets</h5>
                <p className="secondary-text-color">(7300 3777 3888 3334)</p>
              </Col>
              <Col flex="16px">
                <WalletIconSvg />
              </Col>
            </Row>
            <Divider />
            <Row className="pt-3" align="bottom">
              <Skeleton loading={loading}>
                {assetsList &&
                  assetsList
                    .filter((fil) => fil.name === "USD")
                    .map((item) => {
                      return (
                        <Col flex="auto" className="mr-2" key={item.name}>
                          <h1 className="text-white pb-1">{formatCurrency(item.price)} USD</h1>
                          <p className="secondary-text-color">
                            {formatCurrency(item.priceVND)} VND
                          </p>
                        </Col>
                      )
                    })}
              </Skeleton>
              <Col flex="30px">
                <img src={WalletLogo} alt="" />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="group-action pt-7" gutter={24} justify="center">
          <Col flex="48px">
            <Button type="default" icon={<CreditCardSvg />} size="large" disabled />
            <p className="text-center pt-1">Deposit</p>
          </Col>
          <Col flex="48px">
            <Link to="/assets" className="pet">
              <Button type="default" icon={<SendSvg />} size="large" />
            </Link>
            <p className="text-center pt-1">Send</p>
          </Col>
          <Col flex="48px">
            <Button type="default" icon={<RepeatSvg />} size="large" disabled />
            <p className="text-center pt-1">Swap</p>
          </Col>
        </Row>
        <div className="assets">
          <h4 className="pt-4 pb-3">Assets</h4>
          <Skeleton loading={loading}>
            <AssetsList isDefault />
          </Skeleton>
        </div>
      </div>
    </div>
  )
}

export default memo(Dashboard)
