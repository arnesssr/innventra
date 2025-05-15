import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { OrdersPage } from "../orders/OrdersPage"
import { Container } from "../../components/ui/Container"

export function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="details">Account Details</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <OrdersPage />
        </TabsContent>

        <TabsContent value="details">
          {/* Account details will go here */}
        </TabsContent>

        <TabsContent value="addresses">
          {/* Addresses will go here */}
        </TabsContent>

        <TabsContent value="wishlist">
          {/* Wishlist will go here */}
        </TabsContent>
      </Tabs>
    </Container>
  )
}
