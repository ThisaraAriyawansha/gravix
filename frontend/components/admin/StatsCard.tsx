interface StatsCardProps {
  title: string
  value: string
  description: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
}

export default function StatsCard({ title, value, description, trend, icon }: StatsCardProps) {
  return (
    <div className="card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-600">{title}</h3>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-light mb-2">{value}</div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        
        {trend && (
          <div className={`flex items-center text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <svg 
              className={`w-4 h-4 mr-1 ${trend.isPositive ? '' : 'rotate-180'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
    </div>
  )
}