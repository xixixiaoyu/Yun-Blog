import Link from 'next/link'
import { FileX, ArrowLeft, Home } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <FileX className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">文章未找到</h2>
          <p className="text-gray-600 mb-8">
            抱歉，您要查找的文章不存在或已被删除。
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/blog">
            <Button className="w-full flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回博客列表
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
