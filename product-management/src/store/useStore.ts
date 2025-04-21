import { create } from 'zustand'
import { StockMovement, InventoryItem } from '../types/inventoryTypes'
import type { Category as ProductCategory } from '../types/productTypes'
import { checkStockLevel, shouldNotify, generateNotificationMessage } from '../utils/notificationUtils'
import type { Supplier } from '../types/supplierTypes'

export interface CategoryField {
  name: string;
  type: 'text' | 'select' | 'number';
  label: string;
  required: boolean;
  options?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  fields: CategoryField[];
}

interface ImageWithPreview {
  file: File;
  previewUrl: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  description: string;
  images: ImageWithPreview[];
  imageUrls: string[];
  stock: number;
  status: 'draft' | 'published' | 'archived';
  archivedAt?: string;
  updatedAt: string;
  createdAt: string;
  [key: string]: any;
}

const DEFAULT_CATEGORIES: Category[] = [
  { 
    id: 'bibles',
    name: 'Bibles',
    description: 'Holy Bibles in different versions and formats',
    fields: []
  },
  { 
    id: 'books',
    name: 'Books',
    description: 'Christian literature and study materials',
    fields: []
  },
  { 
    id: 'gifts',
    name: 'Gifts & Cards',
    description: 'Gift items and greeting cards for all occasions',
    fields: []
  },
  { 
    id: 'stationery',
    name: 'Stationery',
    description: 'Office and school stationery supplies',
    fields: []
  },
  { 
    id: 'toys',
    name: 'Toys & Games',
    description: 'Fun toys and games for children and adults',
    fields: []
  },
  { 
    id: 'music',
    name: 'Music & Media',
    description: 'Music albums and media content',
    fields: []
  }
]

interface NotificationPreferences {
  lowStock: boolean;
  outOfStock: boolean;
  stockMovements: boolean;
  lowStockThreshold: number;
  browserNotifications: boolean;
  emailNotifications: boolean;
}

interface StockOrder {
  id: string;
  productId: string;
  productName: string;
  categoryId: string;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  notes?: string;
}

interface Store {
  products: Product[];
  categories: Category[];
  inventory: Record<string, InventoryItem>;
  notifications: Array<{
    id: string;
    type: 'low_stock' | 'out_of_stock';
    productId: string;
    productName: string;
    currentStock: number;
    threshold: number;
    message: string;
    timestamp: string;
    read: boolean;
  }>;
  notificationPreferences: NotificationPreferences;
  alerts: {
    id: string;
    type: 'low_stock' | 'out_of_stock';
    productId: string;
    productName: string;
    currentStock: number;
    threshold: number;
    timestamp: string;
    read: boolean;
  }[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (categoryId: string) => void;
  addProduct: (product: Product) => void;
  getCategoryName: (id: string) => string;
  getStats: () => {
    totalProducts: number;
    totalValue: number;
    draftsCount: number;
    publishedCount: number;
  };
  addStockMovement: (movement: Omit<StockMovement, 'id'>) => void;
  updateMinimumStock: (productId: string, minimum: number) => void;
  archiveProduct: (productId: string) => void;
  restoreProduct: (productId: string) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  adjustProductStock: (productId: string, adjustment: number) => void;
  getUnreadNotifications: () => number;
  markNotificationAsRead: (id: string) => void;
  generateStockNotifications: () => void;
  updateNotificationPreferences: (preferences: Partial<NotificationPreferences>) => void;
  addNotification: (notification: Omit<Store['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  generateStockAlerts: () => void;
  markAlertAsRead: (id: string) => void;
  clearNotifications: () => void;
  createStockOrder: (order: Omit<StockOrder, 'id' | 'createdAt' | 'status'>) => void;
  completeStockOrder: (orderId: string) => void;
  cancelStockOrder: (orderId: string) => void;
  stockOrders: StockOrder[];
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  createPurchaseOrder: (order: PurchaseOrder) => void;
}

const generateSKU = (categoryId: string, name: string, variant?: Record<string, string>) => {
  const catPrefix = categoryId.substring(0, 3).toUpperCase();
  const prodCode = name.replace(/\s+/g, '').substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  
  if (variant) {
    const variantCode = Object.entries(variant)
      .map(([_, value]) => value.substring(0, 2).toUpperCase())
      .join('');
    return `${catPrefix}-${prodCode}-${variantCode}-${timestamp}`;
  }
  
  return `${catPrefix}-${prodCode}-${timestamp}`;
};

export const useStore = create<Store>((set, get) => ({
  products: [],
  categories: DEFAULT_CATEGORIES,
  inventory: {},
  notifications: [],
  alerts: [],
  stockOrders: [],
  suppliers: [
    {
      id: 'sup-1',
      name: 'Default Supplier',
      email: 'contact@supplier.com',
      status: 'active',
      createdAt: new Date().toISOString()
    }
  ],
  
  notificationPreferences: {
    lowStock: true,
    outOfStock: true,
    stockMovements: true,
    lowStockThreshold: 20,
    browserNotifications: true,
    emailNotifications: false
  },

  addCategory: (categoryData) => set((state) => ({
    categories: [
      ...state.categories,
      {
        ...categoryData,
        id: categoryData.name.toLowerCase().replace(/\s+/g, '-')
      }
    ]
  })),

  deleteCategory: (categoryId: string) => set(state => {
    const updatedProducts = state.products.map(product => 
      product.category === categoryId 
        ? { ...product, category: 'uncategorized', categoryName: 'Uncategorized' }
        : product
    )

    return {
      categories: state.categories.filter(c => c.id !== categoryId),
      products: updatedProducts
    }
  }),

  addProduct: (product) => set(state => {
    const baseSKU = generateSKU(product.category, product.name);
    interface ProductVariantCombination {
      [key: string]: string;
    }

    interface ProductVariant {
      combination: ProductVariantCombination;
      sku?: string;
      [key: string]: any;
    }

        const variants: ProductVariant[] = product.variants?.map((variant: ProductVariant) => ({
          ...variant,
          sku: generateSKU(product.category, product.name, variant.combination)
        }));

    // Create preview URLs only for new File objects
    const imageUrls = product.images.map(img => {
      if (img instanceof File) {
        return URL.createObjectURL(img)
      }
      return img.previewUrl || ''
    })

    const newProduct = {
      ...product,
      sku: baseSKU,
      variants,
      imageUrls,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return {
      products: [...state.products, newProduct],
      inventory: {
        ...state.inventory,
        [product.id]: {
          productId: product.id,
          productName: product.name,
          categoryId: product.category,
          currentStock: product.stock,
          minimumStock: 5,
          lastUpdated: new Date().toISOString(),
          movements: [{
            id: Date.now().toString(),
            productId: product.id,
            type: 'in',
            quantity: product.stock,
            date: new Date().toISOString(),
            notes: 'Initial stock'
          }]
        }
      }
    };
  }),

  getCategoryName: (categoryId: string) => {
    const category = get().categories.find(c => c.id === categoryId)
    return category ? category.name : categoryId
  },

  getStats: () => {
    const products = get().products
    return {
      totalProducts: products.length,
      totalValue: products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0),
      draftsCount: products.filter(p => p.status === 'draft').length,
      publishedCount: products.filter(p => p.status === 'published').length
    }
  },

  addStockMovement: (movement) => set(state => {
    const item = state.inventory[movement.productId]
    if (!item) return state

    const newMovement = {
      ...movement,
      id: Date.now().toString(),
      date: new Date().toISOString()
    }

    const currentStock = item.currentStock + (
      movement.type === 'in' ? movement.quantity :
      movement.type === 'out' ? -movement.quantity :
      movement.quantity
    )

    // Generate alert if stock is low
    if (currentStock <= item.minimumStock) {
      get().generateStockAlerts();
    }

    // Check if this movement should trigger a notification
    const stockStatus = checkStockLevel({ ...item, currentStock })
    if (stockStatus) {
      get().addNotification({
        type: stockStatus,
        productId: item.productId,
        productName: item.productName,
        currentStock,
        threshold: item.minimumStock,
        message: generateNotificationMessage(
          stockStatus,
          item.productName,
          currentStock,
          item.minimumStock
        )
      })
    }

    return {
      inventory: {
        ...state.inventory,
        [movement.productId]: {
          ...item,
          currentStock,
          lastUpdated: new Date().toISOString(),
          movements: [...item.movements, newMovement]
        }
      }
    }
  }),

  updateMinimumStock: (productId, minimum) => set(state => {
    const inventory = state.inventory[productId];
    if (!inventory) return state;

    const updatedInventory = {
      ...state.inventory,
      [productId]: {
        ...inventory,
        minimumStock: minimum
      }
    };

    // Check if we need to generate alerts after threshold change
    if (inventory.currentStock <= minimum) {
      get().generateStockAlerts();
    }

    return { inventory: updatedInventory };
  }),

  archiveProduct: (productId: string) => set(state => ({
    products: state.products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            status: 'archived', 
            archivedAt: new Date().toISOString() 
          }
        : product
    )
  })),

  restoreProduct: (productId: string) => set(state => ({
    products: state.products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            status: 'published', 
            archivedAt: undefined 
          }
        : product
    )
  })),

  updateProduct: (productId, updates) => set(state => {
    if (updates.images) {
      const oldProduct = state.products.find(p => p.id === productId)
      oldProduct?.imageUrls?.forEach(url => URL.revokeObjectURL(url))
      
      const imageUrls = updates.images.map(img => URL.createObjectURL(img.file))
      updates = { ...updates, imageUrls }
    }

    return {
      products: state.products.map(product =>
        product.id === productId 
          ? { ...product, ...updates }
          : product
      )
    }
  }),

  deleteProduct: (productId) => set(state => ({
    products: state.products.filter(product => product.id !== productId)
  })),

  adjustProductStock: (productId: string, adjustment: number) => set(state => ({
    products: state.products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            stock: Math.max(0, product.stock + adjustment),
            updatedAt: new Date().toISOString()
          }
        : product
    )
  })),

  getUnreadNotifications: () => {
    return get().notifications.filter(n => !n.read).length
  },

  generateStockNotifications: () => {
    const inventory = get().inventory
    const newNotifications = Object.values(inventory)
      .filter(item => item.currentStock <= item.minimumStock)
      .map(item => {
        const type = item.currentStock === 0 ? 'out_of_stock' as const : 'low_stock' as const;
        return {
          id: `${item.productId}-${Date.now()}`,
          type,
          productId: item.productId,
          productName: item.productName,
          currentStock: item.currentStock,
          threshold: item.minimumStock,
          message: generateNotificationMessage(type, item.productName, item.currentStock, item.minimumStock),
          timestamp: new Date().toISOString(),
          read: false
        }
      })

    set({ notifications: newNotifications })
  },

  markNotificationAsRead: (id: string) => set(state => ({
    notifications: state.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    )
  })),

  updateNotificationPreferences: (preferences) => set(state => ({
    notificationPreferences: {
      ...state.notificationPreferences,
      ...preferences
    }
  })),

  addNotification: (notificationData: Omit<Store['notifications'][0], 'id' | 'timestamp' | 'read'>) => set(state => {
    // Check if similar notification exists in last hour
    const recentNotification = state.notifications.find(n => 
      n.productId === notificationData.productId &&
      n.type === notificationData.type &&
      !shouldNotify(notificationData.currentStock, notificationData.threshold, n.timestamp)
    )

    if (recentNotification) return state

    return {
      notifications: [{
        ...notificationData,
        id: `${notificationData.productId}-${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false
      }, ...state.notifications]
    }
  }),

  generateStockAlerts: () => {
    const inventory = get().inventory;
    const alerts = Object.values(inventory)
      .filter(item => item.currentStock <= item.minimumStock)
      .map(item => ({
        id: `${item.productId}-${Date.now()}`,
        type: (item.currentStock === 0 ? 'out_of_stock' : 'low_stock') as 'out_of_stock' | 'low_stock',
        productId: item.productId,
        productName: item.productName,
        currentStock: item.currentStock,
        threshold: item.minimumStock,
        timestamp: new Date().toISOString(),
        read: false
      }));
    
    set({ alerts });
  },

  markAlertAsRead: (id: string) => set(state => ({
    alerts: state.alerts.map(alert =>
      alert.id === id ? { ...alert, read: true } : alert
    )
  })),

  clearNotifications: () => set({ notifications: [] }),

  createStockOrder: (orderData) => set(state => ({
    stockOrders: [
      {
        ...orderData,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      ...state.stockOrders
    ]
  })),

  completeStockOrder: (orderId) => set(state => {
    const order = state.stockOrders.find(o => o.id === orderId)
    if (!order) return state

    // Update inventory when order is completed
    get().addStockMovement({
      productId: order.productId,
      type: 'in',
      quantity: order.quantity,
      notes: `Stock order ${orderId} received`,
      date: new Date().toISOString()
    })

    return {
      stockOrders: state.stockOrders.map(o => 
        o.id === orderId ? {
          ...o,
          status: 'completed',
          completedAt: new Date().toISOString()
        } : o
      )
    }
  }),

  cancelStockOrder: (orderId) => set(state => ({
    stockOrders: state.stockOrders.map(o =>
      o.id === orderId ? { ...o, status: 'cancelled' } : o
    )
  })),

  addSupplier: (supplier) => set(state => ({
    suppliers: [...state.suppliers, supplier]
  })),

  updateSupplier: (id, updates) => set(state => ({
    suppliers: state.suppliers.map(sup => 
      sup.id === id ? { ...sup, ...updates } : sup
    )
  })),

  deleteSupplier: (id) => set(state => ({
    suppliers: state.suppliers.filter(sup => sup.id !== id)
  })),

  createPurchaseOrder: (order) => set((state) => ({
    stockOrders: [...state.stockOrders, order],
    // Optionally update other state like inventory
    notifications: [
      {
        id: Date.now().toString(),
        title: 'Purchase Order Created',
        message: `Purchase order #${order.id} has been created`,
        type: 'info',
        read: false,
        createdAt: new Date().toISOString()
      },
      ...state.notifications
    ]
  })),
}))
