interface StatsCardProps {
  title: string
  value: string
  description: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export default function StatsCard({ title, value, description, trend }: StatsCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gravix-gray-600">{title}</h3>
        {trend && (
          <span className={`text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      
      <div className="text-3xl font-light mb-2">{value}</div>
      <p className="text-sm text-gravix-gray-500">{description}</p>
    </div>
  )
}