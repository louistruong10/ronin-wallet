import { memo, useCallback, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Button, Form, Input, Row, Col, notification } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import logoBg from "assets/logo.png"
import { useApi } from "../modules/api"

const Login: React.FC = () => {
  const [form] = Form.useForm()
  const { post } = useApi("/signin")
  const history = useHistory()
  const handleSubmit = async (test) => {
    const data = await post({ email: "admin@ronin.com", password: form.getFieldValue("password") })
    if (data) {
      localStorage.setItem("token", data?.token)
      history.replace("/dashboard")
    } else {
      notification.error({
        message: "Error",
        description: "Wrong password!",
      })
    }
  }
  const loading = false
  // useEffect(() => {
  //   if (authorized) dispatch(getCurrentUser({}))
  // }, [])

  return (
    <div className="login-page flex">
      <section className="card">
        <Row className="login-container text-center">
          <Col span={24}>
            <div className="login-bg"></div>
            <img src={logoBg} alt="" />
          </Col>
        </Row>
        <div className="title text-center pb-6">
          <h1 className="pb-2">Ronin Wallet</h1>
          <p>Your Digital Passport</p>
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          size="small"
          layout="vertical"
          className="loginForm"
          requiredMark={false}
        >
          <Form.Item
            label="ENTER PASSWORD"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input suffix={<EyeOutlined />} type="password" placeholder="123456" size="large" />
          </Form.Item>
          <div className="text-center">
            <Button
              htmlType="submit"
              type="primary"
              disabled={loading}
              loading={loading}
              className="loginFormButton"
              size="large"
            >
              Unlock
            </Button>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default memo(Login)
