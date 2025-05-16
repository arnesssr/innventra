export interface CategoryFilter {
  label: string;
  type: 'select' | 'range' | 'search';
  options?: string[];
  range?: [number, number];
}

export interface CategoryConfig {
  id: string;
  title: string;
  description: string;
  filters: Record<string, CategoryFilter>;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  books: {
    id: 'books',
    title: "Books",
    description: "Explore our collection of books",
    filters: {
      genre: {
        label: "Genre",
        type: "select",
        options: ["Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Fantasy", "Romance"]
      },
      author: {
        label: "Author",
        type: "search"
      },
      priceRange: {
        label: "Price Range",
        type: "range",
        range: [0, 1000]
      }
    }
  },
  bibles: {
    id: 'bibles',
    title: "Bibles",
    description: "Discover our Bible collection",
    filters: {
      version: {
        label: "Version",
        type: "select",
        options: ["KJV", "NIV", "ESV", "NKJV", "NLT"]
      },
      coverType: {
        label: "Cover Type",
        type: "select",
        options: ["Leather", "Hardcover", "Paperback", "Bonded Leather", "Imitation Leather"]
      },
      priceRange: {
        label: "Price Range",
        type: "range",
        range: [0, 1000]
      }
    }
  },
  gifts: {
    id: 'gifts',
    title: "Gifts",
    description: "Find the perfect gift",
    filters: {
      type: {
        label: "Type",
        type: "select",
        options: ["Cards", "Wall Art", "Accessories"]
      },
      priceRange: {
        label: "Price Range",
        type: "range",
        range: [0, 500]
      }
    }
  },
  stationery: {
    id: 'stationery',
    title: "Stationery",
    description: "Quality stationery supplies",
    filters: {
      type: {
        label: "Type",
        type: "select",
        options: ["Notebooks", "Pens", "Art Supplies"]
      },
      priceRange: {
        label: "Price Range",
        type: "range",
        range: [0, 200]
      }
    }
  },
  toys: {
    id: 'toys',
    title: "Toys",
    description: "Educational and fun toys",
    filters: {
      ageGroup: {
        label: "Age Group",
        type: "select",
        options: ["0-2 years", "3-5 years", "6-8 years", "9+ years"]
      },
      priceRange: {
        label: "Price Range",
        type: "range",
        range: [0, 300]
      }
    }
  }
}
