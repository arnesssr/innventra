import { Facebook, Instagram, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Shop Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/bibles">Bibles</Link></li>
              <li><Link to="/category/books">Christian Books</Link></li>
              <li><Link to="/category/gifts">Gifts</Link></li>
              <li><Link to="/category/stationery">Stationery</Link></li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-3">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t mt-8 pt-8 text-sm text-muted-foreground">
          <p>© 2024 Your Store. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
