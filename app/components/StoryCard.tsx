import { Story, Tag } from '@prisma/client';
import { CurrencyDollarIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

interface StoryCardProps {
  story: Story & {
    tags: Tag[];
  };
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {story.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {story.summary}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {story.revenue && (
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-4 h-4 mr-1" />
              <span>${story.revenue.toLocaleString()}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{new Date(story.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <a
          href={story.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          阅读完整故事 →
        </a>
      </div>
    </div>
  );
}