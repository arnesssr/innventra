import { Facebook, Instagram, Twitter } from "lucide-react"

export function StoreFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg">STORE</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for quality products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</a></li>
              <li><a href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a></li>
              <li><a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              <li><a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              <li><a href="/shipping" className="text-sm text-muted-foreground hover:text-foreground">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} STORE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
