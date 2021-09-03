import { createContext } from "react"

interface DashboardContextProps {
  assetsList: any
  setAssetsList: (value) => void
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined)

export default DashboardContext
