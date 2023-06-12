'use client'

interface TabBarProps{
    body: React.ReactElement
}

const TabBar:React.FC<TabBarProps> = ({body}) => {
  return (
    <div>{body}</div>

  )
}

export default TabBar