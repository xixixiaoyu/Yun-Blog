import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Yun Blog - 分享技术与生活',
  description: '一个现代化的个人博客，分享技术见解与生活感悟',
  keywords: ['博客', '技术', '前端', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Yun' }],
  creator: 'Yun',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://yunblog.example.com',
    title: 'Yun Blog',
    description: '分享技术见解与生活感悟',
    siteName: 'Yun Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yun Blog',
    description: '分享技术见解与生活感悟',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
