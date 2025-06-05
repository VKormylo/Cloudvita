import { cn } from '~/utils/cn'

interface TabProps {
  isActive?: boolean
  onClick: () => void
  children: React.ReactNode
}

const Tab: React.FC<TabProps> = ({ isActive = false, onClick, children }) => {
  return (
    <button className={cn('tab', isActive && 'tab-active')} onClick={onClick}>
      {children}
    </button>
  )
}

export default Tab
