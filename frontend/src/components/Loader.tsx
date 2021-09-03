import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

export interface LoaderProps {
  classCustom?: string
  size?: "default" | "small" | "large"
}

const Loader: React.FC<LoaderProps> = ({ classCustom = "loader-custom", size = "default" }) => {
  const loading = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return (
    <div className={`loader-container ${classCustom}`}>
      <Spin indicator={loading} size={size} />
    </div>
  )
}

export default Loader
