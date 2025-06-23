import Link from 'next/link'
import { ArrowRight, Code, Coffee, Heart } from 'lucide-react'
import Button from './Button'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 头像或图标 */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Code className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Coffee className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Yun Blog
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            分享技术见解与生活感悟，记录成长路上的点点滴滴
          </p>

          {/* 描述 */}
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            这里有关于前端开发、技术思考和生活感悟的文章。
            欢迎一起探讨技术，分享经验，共同成长。
          </p>

          {/* 行动按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/blog">
              <Button size="lg" className="flex items-center group">
                开始阅读
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                了解更多
              </Button>
            </Link>
          </div>

          {/* 统计信息 */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">技术文章</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-gray-600">开源项目</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                <Heart className="w-8 h-8 text-red-500 mr-2" />
                ∞
              </div>
              <div className="text-gray-600">学习热情</div>
            </div>
          </div>
        </div>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
    </section>
  )
}
