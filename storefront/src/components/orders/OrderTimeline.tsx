import { CheckCircle2, Circle, Clock } from "lucide-react"

interface OrderTimelineProps {
  events: Array<{
    status: string
    date: string
    description: string
    location?: string
  }>
}

export function OrderTimeline({ events }: OrderTimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, idx) => (
          <li key={idx}>
            <div className="relative pb-8">
              {idx !== events.length - 1 && (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-accent" />
              )}
              <div className="relative flex items-center space-x-3">
                <div>
                  {idx === 0 ? (
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  ) : idx === events.length - 1 ? (
                    <Circle className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <Clock className="h-8 w-8 text-orange-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{event.status}</div>
                  <div className="text-sm text-muted-foreground">{event.description}</div>
                  <div className="text-sm text-muted-foreground">{event.date}</div>
                  {event.location && (
                    <div className="text-sm text-muted-foreground">{event.location}</div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
