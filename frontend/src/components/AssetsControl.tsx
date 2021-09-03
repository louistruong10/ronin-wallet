import { memo, useState } from "react"
import USD from "assets/USD.png"
import EUR from "assets/EUR.png"
import YEN from "assets/YEN.png"
import { Button, Col, Modal, Row } from "antd"
import Icon from "@ant-design/icons"
import Layers from "./Icon/Layers"
import AssetsList from "./AssetsList"

interface IAssetModal {
  onSet: (name: string) => void
}

const AssetsControl: React.FC<IAssetModal> = ({ onSet }) => {
  const handleSubmit = () => console.log("submit")
  const [visible, setVisible] = useState(false)

  const onSelect = (name) => {
    setVisible(false)
    onSet(name)
  }

  return (
    <div className="assets-control-container">
      <Button
        className="assets-control"
        type="default"
        onClick={() => setVisible(true)}
        size="large"
      >
        <Row align="middle">
          <Col flex="24px">
            <img src={EUR} alt="" />
          </Col>
          <Col flex="auto" className="text-left pl-2">
            EUR
          </Col>
          <Col flex="24px">
            <Icon component={Layers} />
          </Col>
        </Row>
      </Button>
      <Modal
        className="assets-modal"
        visible={visible}
        title="Assets"
        onCancel={() => {
          setVisible(false)
        }}
        footer={null}
      >
        <AssetsList isDefault={false} onSelect={onSelect} />
      </Modal>
    </div>
  )
}

export default memo(AssetsControl)
