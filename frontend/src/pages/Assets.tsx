import { memo, useContext, useState } from "react"
import { Button, Form, Input, Row, Col, InputNumber, Modal } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import AssetsControl from "components/AssetsControl"
import { useHistory } from "react-router-dom"
import DashboardContext from "context/DashboardContext"

const Assets: React.FC = () => {
  const { assetsList } = useContext(DashboardContext)
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const history = useHistory()
  const loading = false

  const handleSubmit = () => {
    setVisible(true)
  }

  const onCancel = () => {
    history.replace("/dashboard")
  }

  const onSetAssetsValue = (name: string) => {
    const assetsValue = { ...form.getFieldsValue(), ...{ assets: name } }
    form.setFieldsValue(assetsValue)
  }

  return (
    <div className="assets-page">
      <Row className="header pb-20 text-center" align="middle">
        <Col span={24}>
          <Button
            className="back-btn"
            type="default"
            icon={<LeftOutlined />}
            size="middle"
            onClick={onCancel}
          />
          <h5>Send Assets</h5>
        </Col>
      </Row>
      <div className="body pt-6 px-20 pb-20">
        <Form
          form={form}
          onFinish={handleSubmit}
          size="small"
          layout="vertical"
          className="form-assets"
          requiredMark={false}
        >
          <Form.Item label="FROM" name="from">
            <Input type="text" placeholder="My Wallet (7300...3334)" size="large" disabled />
          </Form.Item>
          <Form.Item label="TO" name="to" rules={[{ required: true, message: "Address is empty" }]}>
            <Input type="text" placeholder="" size="large" />
          </Form.Item>
          <Form.Item label="ASSET" name="assets">
            <AssetsControl onSet={onSetAssetsValue} />
          </Form.Item>
          <Form.Item
            label="AMOUNT"
            name="amount"
            rules={[{ required: true, message: "Amount is empty" }]}
          >
            <InputNumber style={{ width: "100%" }} min="0" size="large" className="amount-input" />
          </Form.Item>
          <div className="amount-avail">Available: 50EUR</div>
          <div className="input-text">MAX</div>
          <Row>
            <Col span={12}>
              <Button type="default" className="cancel-btn" size="large" onClick={onCancel}>
                Cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button
                htmlType="submit"
                type="primary"
                disabled={loading}
                loading={loading}
                className="save-btn"
                size="large"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Modal
        visible={visible}
        className="send-success"
        title="Successfully sent"
        closable={false}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              setVisible(false)
              history.replace("/dashboard")
            }}
          >
            OK
          </Button>,
        ]}
      >
        <h5 className="font-weight-500">
          Your <b>EUR</b> has been sent! <br /> Thank you for using our service
        </h5>
      </Modal>
    </div>
  )
}

export default memo(Assets)
