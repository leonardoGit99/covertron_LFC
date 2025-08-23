import React from 'react'

// Types
type Props = {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function SectionHeader({title, description, icon: Icon}: Props) {
  return (
    <div>
      {/* Header */}
      <div className="text-3xl font-bold flex items-center justify-start gap-2">
        <Icon className="w-8 h-8 text-sky-700 dark:text-sky-400" />
        <h1 className='dark:text-white'>{title}</h1>
      </div>
      <p className="text-muted-foreground dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}

export default SectionHeader