import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { useToast } from "../../hooks/useToast"

interface PromoCodeInputProps {
  onApply: (code: string) => Promise<boolean>
}

export function PromoCodeInput({ onApply }: PromoCodeInputProps) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    setLoading(true)
    try {
      const success = await onApply(code)
      if (success) {
        toast({
          title: "Success",
          description: "Promo code applied successfully",
        })
        setCode("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid promo code",
        variant: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Enter promo code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" variant="secondary" disabled={loading}>
        {loading ? "Applying..." : "Apply"}
      </Button>
    </form>
  )
}
