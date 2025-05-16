import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { OrderHistory } from "../../components/account/OrderHistory"
import { AccountDetails } from "../../components/account/AccountDetails"
import { AddressBook } from "../../components/account/AddressBook"
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
        </TabsList>

        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="details">
          <AccountDetails />
        </TabsContent>

        <TabsContent value="addresses">
          <AddressBook />
        </TabsContent>
      </Tabs>
    </Container>
  )
}
