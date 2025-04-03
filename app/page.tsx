import { PrismaClient } from '@prisma/client';
import StoryCard from './components/StoryCard';
import Header from './components/Header';

const prisma = new PrismaClient();

async function getStories() {
  const stories = await prisma.story.findMany({
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  });
  return stories;
}

export default async function Home() {
  const stories = await getStories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">独立开发者故事</h1>
          <p className="text-lg text-gray-600">
            发现、学习和分享独立开发者的成功经验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </main>
    </div>
  );
}