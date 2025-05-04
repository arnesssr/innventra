type Listener = (data: any) => void

class EventBus {
  private listeners: { [event: string]: Listener[] } = {}

  subscribe(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
    return () => this.unsubscribe(event, callback)
  }

  publish(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data))
    }
  }

  private unsubscribe(event: string, callback: Listener) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }
}

export const eventBus = new EventBus()
