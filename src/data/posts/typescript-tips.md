---
title: "TypeScript 实用技巧集合"
date: "2024-01-25"
excerpt: "分享一些在日常开发中非常实用的 TypeScript 技巧，帮助你写出更安全、更优雅的代码。"
category: "技术"
tags: ["TypeScript", "JavaScript", "编程技巧"]
author: "Yun"
---

# TypeScript 实用技巧集合

TypeScript 已经成为现代前端开发的标配。本文分享一些实用的 TypeScript 技巧，帮助你提升开发效率。

## 1. 联合类型与类型守卫

### 联合类型

```typescript
type Status = 'loading' | 'success' | 'error'

interface ApiResponse {
  status: Status
  data?: any
  error?: string
}
```

### 类型守卫

```typescript
function isError(response: ApiResponse): response is ApiResponse & { status: 'error' } {
  return response.status === 'error'
}

// 使用
if (isError(response)) {
  // TypeScript 知道这里 response.error 存在
  console.error(response.error)
}
```

## 2. 泛型的高级用法

### 条件类型

```typescript
type ApiResult<T> = T extends string 
  ? { message: T } 
  : { data: T }

type StringResult = ApiResult<string>  // { message: string }
type NumberResult = ApiResult<number>  // { data: number }
```

### 映射类型

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

interface User {
  id: number
  name: string
  email?: string
}

type PartialUser = Partial<User>  // 所有属性都是可选的
type RequiredUser = Required<User>  // 所有属性都是必需的
```

## 3. 实用工具类型

### Pick 和 Omit

```typescript
interface BlogPost {
  id: number
  title: string
  content: string
  author: string
  createdAt: Date
  updatedAt: Date
}

// 只选择需要的字段
type BlogPostSummary = Pick<BlogPost, 'id' | 'title' | 'author'>

// 排除不需要的字段
type BlogPostInput = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>
```

### Record 类型

```typescript
type Theme = 'light' | 'dark'
type Colors = Record<Theme, { primary: string; secondary: string }>

const colors: Colors = {
  light: { primary: '#000', secondary: '#666' },
  dark: { primary: '#fff', secondary: '#ccc' }
}
```

## 4. 函数重载

```typescript
function createElement(tag: 'div'): HTMLDivElement
function createElement(tag: 'span'): HTMLSpanElement
function createElement(tag: 'button'): HTMLButtonElement
function createElement(tag: string): HTMLElement {
  return document.createElement(tag)
}

// TypeScript 会根据参数推断返回类型
const div = createElement('div')  // HTMLDivElement
const span = createElement('span')  // HTMLSpanElement
```

## 5. 模板字面量类型

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'>  // 'onClick'
type HoverEvent = EventName<'hover'>  // 'onHover'

// 实际应用
interface EventHandlers {
  onClick: () => void
  onHover: () => void
  onFocus: () => void
}

type EventType = keyof EventHandlers  // 'onClick' | 'onHover' | 'onFocus'
```

## 6. 装饰器类型

```typescript
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  
  descriptor.value = function (...args: any[]) {
    console.log(`调用方法: ${propertyKey}`)
    return originalMethod.apply(this, args)
  }
}

class ApiService {
  @Log
  async fetchData(url: string): Promise<any> {
    const response = await fetch(url)
    return response.json()
  }
}
```

## 7. 类型断言的最佳实践

```typescript
// 避免使用 any
const userInput = document.getElementById('user-input') as HTMLInputElement

// 使用类型守卫更安全
function isHTMLInputElement(element: Element | null): element is HTMLInputElement {
  return element !== null && element.tagName === 'INPUT'
}

const element = document.getElementById('user-input')
if (isHTMLInputElement(element)) {
  console.log(element.value)  // 安全访问
}
```

## 总结

这些 TypeScript 技巧可以帮助你：

- 写出更类型安全的代码
- 提升开发体验和效率
- 减少运行时错误
- 让代码更易维护

记住：**好的类型设计是 TypeScript 项目成功的关键**。
