import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPostsMeta, getRelatedPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, User, ArrowLeft, Tag as TagIcon } from 'lucide-react'
import BlogCard from '@/components/ui/BlogCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPostsMeta()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到 - Yun Blog',
    }
  }

  return {
    title: `${post.title} - Yun Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按钮 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回博客列表
            </Button>
          </Link>
        </div>
      </div>

      {/* 文章内容 */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 文章头部 */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.date)}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
            {post.readingTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readingTime} 分钟阅读
              </div>
            )}
          </div>
          
          {/* 标签 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  <TagIcon className="w-3 h-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* 文章正文 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* 文章底部 */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-500">
              发布于 {formatDate(post.date)} • 作者：{post.author}
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/blog">
                <Button variant="outline" size="sm">
                  更多文章
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </article>

      {/* 相关文章 */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">相关文章</h2>
              <p className="text-lg text-gray-600">
                您可能还对这些文章感兴趣
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
