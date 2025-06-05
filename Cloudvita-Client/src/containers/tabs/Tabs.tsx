import Tab from '~/components/tab/Tab'
import './tabs.scss'

interface TabProps {
  displayName: string
  value: string
}

interface TabsProps {
  tabs: TabProps[]
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <Tab
          key={tab.value}
          isActive={index === activeTab}
          onClick={() => setActiveTab(tabs.findIndex((item) => item === tab))}
        >
          {tab.displayName}
        </Tab>
      ))}
    </div>
  )
}

export default Tabs
