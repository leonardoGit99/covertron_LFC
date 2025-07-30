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
      <h1 className="text-3xl font-bold flex items-center justify-start gap-2">
        <Icon className="w-8 h-8 text-primary" />
        {title}
      </h1>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export default SectionHeader