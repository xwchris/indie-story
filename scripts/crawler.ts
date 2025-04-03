import axios from 'axios';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sources = [
  {
    name: 'Indie Hackers',
    url: 'https://www.indiehackers.com/interviews',
    selector: '.interview-link',
  },
  // 可以添加更多来源
];

async function extractContent(url: string): Promise<string> {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  // 根据不同来源调整选择器
  return $('.content').text();
}

async function summarizeWithAI(content: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "你是一个专业的内容总结助手。请总结以下独立开发者的故事，包括：1. 核心业务 2. 收入情况 3. 成功要点"
      },
      {
        role: "user",
        content
      }
    ],
    model: "gpt-4-turbo-preview",
  });

  return completion.choices[0].message.content;
}

async function crawlStories() {
  for (const source of sources) {
    try {
      const { data } = await axios.get(source.url);
      const $ = cheerio.load(data);
      
      const stories = $(source.selector)
        .map(async (_, element) => {
          const $element = $(element);
          const title = $element.text();
          const sourceUrl = $element.attr('href');
          
          if (!sourceUrl) return null;
          
          const content = await extractContent(sourceUrl);
          const summary = await summarizeWithAI(content);
          
          // 提取收入信息（示例）
          const revenueMatch = content.match(/\$(\d+,?\d*)/);
          const revenue = revenueMatch ? parseFloat(revenueMatch[1].replace(',', '')) : null;
          
          return prisma.story.create({
            data: {
              title,
              content,
              summary,
              sourceUrl,
              revenue,
              authorName: '', // 需要从页面提取
              tags: {
                create: [] // 需要从内容分析提取标签
              }
            }
          });
        })
        .get();
      
      await Promise.all(stories.filter(Boolean));
    } catch (error) {
      console.error(`Error crawling ${source.name}:`, error);
    }
  }
}

// 运行爬虫
crawlStories()
  .then(() => console.log('Crawling completed'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());