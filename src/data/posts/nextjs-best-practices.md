---
title: "Next.js 14 最佳实践指南"
date: "2024-01-20"
excerpt: "深入探讨 Next.js 14 的最佳实践，包括 App Router、服务端组件、性能优化等核心概念。"
category: "技术"
tags: ["Next.js", "React", "前端", "最佳实践"]
author: "Yun"
---

# Next.js 14 最佳实践指南

Next.js 14 带来了许多激动人心的新特性，特别是 App Router 的稳定版本。本文将分享一些在实际项目中的最佳实践。

## App Router vs Pages Router

### App Router 的优势

App Router 是 Next.js 的未来，它提供了：

- **更好的开发体验** - 基于文件系统的路由更加直观
- **服务端组件** - 默认在服务端渲染，提升性能
- **流式渲染** - 支持 Suspense 和流式 SSR
- **嵌套布局** - 更灵活的布局系统

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

## 服务端组件最佳实践

### 1. 默认使用服务端组件

```typescript
// 服务端组件 - 默认行为
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### 2. 明确标记客户端组件

```typescript
'use client'

import { useState } from 'react'

export function SearchBox() {
  const [query, setQuery] = useState('')
  
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="搜索文章..."
    />
  )
}
```

## 性能优化技巧

### 1. 图片优化

```typescript
import Image from 'next/image'

export function BlogImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="rounded-lg"
      priority={false}
    />
  )
}
```

### 2. 字体优化

```typescript
import { Inter, Noto_Sans_SC } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const notoSansSC = Noto_Sans_SC({ subsets: ['chinese-simplified'] })

export { inter, notoSansSC }
```

## 数据获取策略

### 静态生成 (SSG)

```typescript
export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

### 增量静态再生 (ISR)

```typescript
export const revalidate = 3600 // 1 hour

async function BlogList() {
  const posts = await getPosts()
  
  return (
    <div>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

## 总结

Next.js 14 为现代 Web 开发提供了强大的工具集。通过合理使用服务端组件、优化性能和遵循最佳实践，我们可以构建出快速、可维护的应用程序。

记住：**先使用服务端组件，只在需要交互时才使用客户端组件**。
