import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

export default function MessageIconBubblePage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Card className="absolute top-4 left-4 w-12 h-12 rounded-full shadow-lg">
        <CardContent className="p-0 flex items-center justify-center h-full">
          <MessageCircle className="h-6 w-6 text-primary" aria-hidden="true" />
        </CardContent>
      </Card>
      <span className="sr-only">Message notification</span>
    </div>
  )
}