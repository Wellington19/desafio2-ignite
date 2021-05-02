import { GlobalProvider } from './contexts/GlobalContext'
import { SideBar } from './components/SideBar'
import { Content } from './components/Content'

import './styles/global.scss'

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GlobalProvider>
        <SideBar />
        <Content />
      </GlobalProvider>
    </div>
  )
}