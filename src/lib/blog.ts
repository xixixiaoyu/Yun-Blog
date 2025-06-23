import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { BlogPost, BlogPostMeta, Category, Tag } from '@/types/blog'

const postsDirectory = path.join(process.cwd(), 'src/data/posts')

// 获取所有文章的元数据
export function getAllPostsMeta(): BlogPostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        category: matterResult.data.category,
        tags: matterResult.data.tags || [],
        author: matterResult.data.author,
        readingTime: calculateReadingTime(matterResult.content),
      }
    })

  // 按日期排序
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// 获取单篇文章的完整内容
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    // 处理 Markdown 内容
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      content: contentHtml,
      category: matterResult.data.category,
      tags: matterResult.data.tags || [],
      author: matterResult.data.author,
      readingTime: calculateReadingTime(matterResult.content),
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// 获取所有分类
export function getAllCategories(): Category[] {
  const posts = getAllPostsMeta()
  const categoryMap = new Map<string, number>()

  posts.forEach(post => {
    const count = categoryMap.get(post.category) || 0
    categoryMap.set(post.category, count + 1)
  })

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: slugify(name),
    count,
  }))
}

// 获取所有标签
export function getAllTags(): Tag[] {
  const posts = getAllPostsMeta()
  const tagMap = new Map<string, number>()

  posts.forEach(post => {
    post.tags.forEach(tag => {
      const count = tagMap.get(tag) || 0
      tagMap.set(tag, count + 1)
    })
  })

  return Array.from(tagMap.entries()).map(([name, count]) => ({
    name,
    slug: slugify(name),
    count,
  }))
}

// 根据分类获取文章
export function getPostsByCategory(category: string): BlogPostMeta[] {
  const allPosts = getAllPostsMeta()
  return allPosts.filter(post => slugify(post.category) === category)
}

// 根据标签获取文章
export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPostsMeta()
  return allPosts.filter(post => 
    post.tags.some(postTag => slugify(postTag) === tag)
  )
}

// 搜索文章
export function searchPosts(query: string): BlogPostMeta[] {
  const allPosts = getAllPostsMeta()
  const lowercaseQuery = query.toLowerCase()

  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  )
}

// 获取相关文章
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
  const allPosts = getAllPostsMeta()
  const currentPost = allPosts.find(post => post.slug === currentSlug)
  
  if (!currentPost) return []

  // 根据标签和分类找相关文章
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit)

  return relatedPosts
}

// 计算阅读时间（假设每分钟阅读 200 个字）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// 生成 slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// 分页功能
export function paginatePosts(posts: BlogPostMeta[], page: number, postsPerPage: number = 6) {
  const startIndex = (page - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = posts.slice(startIndex, endIndex)

  return {
    posts: paginatedPosts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(posts.length / postsPerPage),
      totalPosts: posts.length,
      hasNextPage: endIndex < posts.length,
      hasPrevPage: page > 1,
    }
  }
}
