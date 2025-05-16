import React, { useState } from 'react'
import { AddressForm } from "../../components/checkout/AddressForm"
import { PaymentForm } from "../../components/checkout/PaymentForm"
import { OrderSummary } from "../../components/checkout/OrderSummary"
import { OrderConfirmation } from "../../components/checkout/OrderConfirmation"
import { Button } from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../../store/cartStore"

interface PaymentFormData {
  method: 'mpesa' | 'card' | 'bank'
  phone?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

interface OrderData {
  address: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address1: string
    address2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  payment: PaymentFormData
  orderNumber: string
}

type CheckoutStep = 'address' | 'payment' | 'confirmation'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items } = useCartStore()
  const [step, setStep] = useState<'address' | 'payment' | 'confirmation'>('address')
  const [orderData, setOrderData] = useState<OrderData>({
    address: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    payment: {
      method: 'mpesa'
    },
    orderNumber: ''
  })

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    )
  }

  // Render different steps
  const renderStep = () => {
    switch (step) {
      case 'address':
        return (
          <AddressForm 
            data={orderData.address}
            onChange={(data) => setOrderData(prev => ({
              ...prev,
              address: { ...prev.address, ...data }
            }))}
          />
        )
      
      case 'payment':
        return (
          <PaymentForm 
            data={orderData.payment}
            onSubmit={(data) => {
              setOrderData(prev => ({ ...prev, payment: data }))
              // Simulate order confirmation
              setOrderData(prev => ({
                ...prev,
                orderNumber: `ORD-${Date.now()}`
              }))
              setStep('confirmation')
            }}
          />
        )
      
      case 'confirmation':
        return (
          <OrderConfirmation 
            orderNumber={orderData.orderNumber}
            email={orderData.address.email}
          />
        )
    }
  }

  return (
    <div className="container py-8 space-y-8">
      {step !== 'confirmation' && (
        <>
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className={step === 'address' ? 'text-orange-500 font-medium' : ''}>
              Address
            </span>
            <span>→</span>
            <span className={step === 'payment' ? 'text-orange-500 font-medium' : ''}>
              Payment
            </span>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {renderStep()}
          
          {step === 'address' && (
            <Button 
              className="mt-6 w-full"
              onClick={() => setStep('payment')}
            >
              Continue to Payment
            </Button>
          )}
        </div>

        {step !== 'confirmation' && (
          <aside>
            <OrderSummary />
          </aside>
        )}
      </div>
    </div>
  )
}
