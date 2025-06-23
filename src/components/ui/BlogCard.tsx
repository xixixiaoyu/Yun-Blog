import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { BlogPostMeta } from '@/types/blog'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader } from './Card'
import Badge from './Badge'

interface BlogCardProps {
  post: BlogPostMeta
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary">{post.category}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(post.date)}
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-gray-600 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-full transition-colors duration-200"
            >
              #{tag}
            </Link>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
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
        
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group/link transition-colors duration-200"
        >
          阅读更多
          <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </CardFooter>
    </Card>
  )
}
