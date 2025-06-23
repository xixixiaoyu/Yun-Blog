import Link from 'next/link'
import { getAllPostsMeta, paginatePosts } from '@/lib/blog'
import Hero from '@/components/ui/Hero'
import BlogCard from '@/components/ui/BlogCard'
import Button from '@/components/ui/Button'
import { ArrowRight, TrendingUp, BookOpen, Tag } from 'lucide-react'

export default function Home() {
  const allPosts = getAllPostsMeta()
  const { posts: recentPosts } = paginatePosts(allPosts, 1, 6)
  const featuredPosts = allPosts.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">精选文章</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              这里是一些精心挑选的优质文章，涵盖技术分享和生活感悟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">最新文章</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              最新发布的文章，持续分享有价值的内容
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" className="flex items-center group">
                查看所有文章
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Tag className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">文章分类</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              按照不同主题分类的文章，方便您找到感兴趣的内容
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/categories/技术"
              className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">技术分享</h3>
                <p className="text-gray-600">前端开发、编程技巧、工具使用等技术相关内容</p>
              </div>
            </Link>

            <Link
              href="/categories/生活"
              className="group p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">生活感悟</h3>
                <p className="text-gray-600">日常生活、个人思考、成长感悟等内容</p>
              </div>
            </Link>

            <Link
              href="/categories"
              className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">更多分类</h3>
                <p className="text-gray-600">探索更多有趣的文章分类和主题</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
