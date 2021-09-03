import { memo, useContext, useState, useEffect } from "react"
import { Row, Col } from "antd"
import DashboardContext from "context/DashboardContext"
import { formatCurrency } from "modules/common"

interface IAssetList {
  isDefault: boolean
  onSelect?: (name: string) => void
}
const AssetsList: React.FC<IAssetList> = ({ isDefault, onSelect }) => {
  const { assetsList } = useContext(DashboardContext)

  const onClick = (e) => {
    onSelect(e)
  }

  return (
    <div className={`assets-list ${isDefault ? "default" : "select"}`}>
      {assetsList &&
        assetsList
          .filter((fil) => fil.name !== "USD")
          .map((i) => {
            return (
              <Row
                className="p-20 mb-2 br-8"
                align="middle"
                onClick={() => onClick(i.name)}
                key={i.name}
              >
                <Col flex="32px">
                  <img src={i.image} alt="" />
                </Col>
                <Col className="ml-3" flex="auto">
                  <h5 className="pb-1">
                    {formatCurrency(i.price)} {i.name}
                  </h5>
                  <p className="text-gray">{formatCurrency(i.priceVND)} VND</p>
                </Col>
              </Row>
            )
          })}
    </div>
  )
}

AssetsList.defaultProps = {
  onSelect: () => null,
}

export default memo(AssetsList)
