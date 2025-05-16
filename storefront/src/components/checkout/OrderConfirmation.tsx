import { CheckCircle } from "lucide-react"
import { Button } from "../ui/Button"
import { useNavigate } from "react-router-dom"

interface OrderConfirmationProps {
  orderNumber: string
  email: string
}

export function OrderConfirmation({ orderNumber, email }: OrderConfirmationProps) {
  const navigate = useNavigate()

  return (
    <div className="text-center space-y-6 py-12">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Order Confirmed!</h2>
        <p className="text-muted-foreground">
          Order #{orderNumber}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          We've sent a confirmation email to:
        </p>
        <p className="font-medium">{email}</p>
      </div>

      <Button 
        className="mt-8"
        onClick={() => navigate('/')}
      >
        Continue Shopping
      </Button>
    </div>
  )
}
