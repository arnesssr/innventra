import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { Search } from "lucide-react"
import { useState } from "react"
import { FolderKanban, PackageCheck, FileEdit, Archive } from 'lucide-react' // Import icons

export function ProductsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || 'categories'
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="p-6 space-y-6">
      {/* Search bar styled to match header */}
      <div className="flex-1 relative max-w-xl">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all items..." 
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground flex-1 outline-none"
          />
        </div>
      </div>

      <Tabs 
        value={currentPath}
        onValueChange={(value) => navigate(`/app/products/${value}`)}
      >
        <TabsList>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderKanban className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="published" className="flex items-center gap-2">
            <PackageCheck className="h-4 w-4" />
            Published
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-2">
            <FileEdit className="h-4 w-4" />
            Drafts
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            Archived
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        <Outlet context={{ searchTerm }} />
      </div>
    </div>
  )
}
