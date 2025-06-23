import { Suspense } from 'react'
import { getAllPostsMeta, paginatePosts } from '@/lib/blog'
import BlogCard from '@/components/ui/BlogCard'
import Pagination from '@/components/ui/Pagination'
import { BookOpen, Search } from 'lucide-react'
import Link from 'next/link'

interface BlogPageProps {
  searchParams: { page?: string }
}

export const metadata = {
  title: '博客文章 - Yun Blog',
  description: '浏览所有博客文章，包括技术分享、生活感悟等内容',
}

function BlogContent({ page }: { page: number }) {
  const allPosts = getAllPostsMeta()
  const { posts, pagination } = paginatePosts(allPosts, page, 6)

  return (
    <>
      {/* 文章网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* 分页 */}
      <Pagination pagination={pagination} basePath="/blog" />
    </>
  )
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1
  const allPosts = getAllPostsMeta()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">博客文章</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            这里收录了所有的博客文章，包括技术分享、生活感悟和个人思考
          </p>
          <div className="mt-6 flex items-center justify-center">
            <span className="text-sm text-gray-500">
              共 {allPosts.length} 篇文章
            </span>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Search className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-700">搜索文章...</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/categories"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              浏览分类
            </Link>
            <Link
              href="/tags"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              浏览标签
            </Link>
          </div>
        </div>

        {/* 文章列表 */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        }>
          <BlogContent page={page} />
        </Suspense>
      </div>
    </div>
  )
}
