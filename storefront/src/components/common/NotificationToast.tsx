import { Toast, ToastProvider, ToastViewport } from "../ui/Toast"
import { useToast } from "../../hooks/useToast"

export function NotificationToast() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <div className="font-medium">{title}</div>}
              {description && <div className="text-sm">{description}</div>}
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
