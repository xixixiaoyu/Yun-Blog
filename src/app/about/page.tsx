import Link from 'next/link'
import { 
  Code, 
  Coffee, 
  Heart, 
  BookOpen, 
  Github, 
  Twitter, 
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export const metadata = {
  title: '关于我 - Yun Blog',
  description: '了解更多关于我的信息，包括我的技能、经历和兴趣爱好',
}

export default function AboutPage() {
  const skills = [
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'React/Next.js', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Go', level: 75 },
    { name: 'Docker/K8s', level: 70 },
  ]

  const experiences = [
    {
      title: '高级前端工程师',
      company: '某科技公司',
      period: '2022 - 至今',
      description: '负责前端架构设计和团队技术管理，主导多个大型项目的开发。',
    },
    {
      title: '前端工程师',
      company: '某互联网公司',
      period: '2020 - 2022',
      description: '参与多个 Web 应用的开发，积累了丰富的前端开发经验。',
    },
    {
      title: '软件工程师',
      company: '某软件公司',
      period: '2018 - 2020',
      description: '从事全栈开发工作，熟悉前后端技术栈。',
    },
  ]

  const projects = [
    {
      name: 'Yun Blog',
      description: '基于 Next.js 14 的现代化博客系统',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      link: 'https://github.com/example/yun-blog',
    },
    {
      name: 'Task Manager',
      description: '团队协作任务管理工具',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com/example/task-manager',
    },
    {
      name: 'Weather App',
      description: '简洁美观的天气预报应用',
      tech: ['Vue.js', 'Express', 'API'],
      link: 'https://github.com/example/weather-app',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 个人介绍 */}
        <section className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Code className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <Coffee className="w-6 h-6 text-yellow-800" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            你好，我是 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Yun</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            一名热爱技术的全栈工程师，专注于前端开发和用户体验设计。
            喜欢探索新技术，分享知识，用代码创造美好的数字体验。
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              中国，上海
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              5+ 年开发经验
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-4 h-4 mr-2" />
              全栈工程师
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* 技能 */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                技能专长
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 工作经历 */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-blue-500" />
                工作经历
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-500">{exp.period}</span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 项目展示 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">项目作品</h2>
            <p className="text-lg text-gray-600">一些我参与开发的项目</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    查看代码
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 联系我 */}
        <section className="text-center">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="py-12">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">让我们一起交流</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                如果您对我的工作感兴趣，或者想要讨论技术话题，欢迎随时联系我。
                我很乐意与志同道合的朋友交流学习。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@example.com">
                  <Button size="lg" className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    发送邮件
                  </Button>
                </a>
                <Link href="/blog">
                  <Button variant="outline" size="lg" className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    阅读我的博客
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
