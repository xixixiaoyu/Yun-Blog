import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline'
}

export default function Badge({ 
  className, 
  variant = 'default', 
  ...props 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200'
  
  const variants = {
    default: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  }

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  )
}
