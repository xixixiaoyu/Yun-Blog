import Link from 'next/link'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'Email',
      href: 'mailto:hello@example.com',
      icon: Mail,
    },
  ]

  const footerLinks = [
    {
      title: '导航',
      links: [
        { name: '首页', href: '/' },
        { name: '博客', href: '/blog' },
        { name: '关于', href: '/about' },
      ],
    },
    {
      title: '分类',
      links: [
        { name: '技术', href: '/categories/技术' },
        { name: '生活', href: '/categories/生活' },
        { name: '思考', href: '/categories/思考' },
      ],
    },
    {
      title: '友情链接',
      links: [
        { name: 'Next.js', href: 'https://nextjs.org' },
        { name: 'TypeScript', href: 'https://typescriptlang.org' },
        { name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
      ],
    },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Yun Blog</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              分享技术见解与生活感悟，记录成长路上的点点滴滴。
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Yun Blog. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center mt-2 md:mt-0">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
