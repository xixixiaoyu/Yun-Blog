export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  readingTime?: number
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  readingTime?: number
}

export interface Category {
  name: string
  slug: string
  count: number
  description?: string
}

export interface Tag {
  name: string
  slug: string
  count: number
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalPosts: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface SearchResult {
  posts: BlogPostMeta[]
  totalResults: number
  query: string
}
