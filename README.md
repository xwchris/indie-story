# Indie Story

一个自动化收集和展示独立开发者成功故事的平台。

## 功能特点

- 🤖 自动化内容采集：每日自动从多个来源收集独立开发者的故事
- 🧠 AI 智能处理：使用 AI 技术自动整合和总结内容
- 📱 响应式设计：完美适配各种设备的现代化界面
- 🔍 智能搜索：支持多维度筛选和搜索成功故事
- 📊 数据可视化：直观展示成功案例的关键数据

## 技术栈

- **前端框架**: Next.js 14
- **样式方案**: TailwindCSS
- **数据库**: PostgreSQL + Prisma
- **AI 处理**: OpenAI API
- **内容抓取**: Cheerio
- **UI 组件**: Headless UI + Heroicons

## 开发指南

### 环境准备

1. 克隆项目
```bash
git clone https://github.com/xwchris/indie-story.git
cd indie-story
```

2. 安装依赖
```bash
npm install
```

3. 环境变量配置
创建 `.env` 文件并添加以下配置：
```
DATABASE_URL="postgresql://user:password@localhost:5432/indie_story"
OPENAI_API_KEY="your-api-key"
```

4. 初始化数据库
```bash
npx prisma migrate dev
```

5. 启动开发服务器
```bash
npm run dev
```

## 项目结构

```
indie-story/
├── app/                 # Next.js 应用目录
│   ├── api/            # API 路由
│   ├── components/     # 共享组件
│   ├── lib/           # 工具函数和服务
│   └── pages/         # 页面组件
├── prisma/             # 数据库模型和迁移
├── public/             # 静态资源
└── scripts/            # 自动化脚本
```

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT