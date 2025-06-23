import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PaginationInfo } from '@/types/blog'
import Button from './Button'

interface PaginationProps {
  pagination: PaginationInfo
  basePath: string
}

export default function Pagination({ pagination, basePath }: PaginationProps) {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* 上一页 */}
      {hasPrevPage ? (
        <Link href={`${basePath}${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`}>
          <Button variant="outline" size="sm" className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            上一页
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled className="flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" />
          上一页
        </Button>
      )}

      {/* 页码 */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Link
                href={`${basePath}${page > 1 ? `?page=${page}` : ''}`}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* 下一页 */}
      {hasNextPage ? (
        <Link href={`${basePath}?page=${currentPage + 1}`}>
          <Button variant="outline" size="sm" className="flex items-center">
            下一页
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled className="flex items-center">
          下一页
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      )}
    </div>
  )
}
