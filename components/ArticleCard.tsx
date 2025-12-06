import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'compact';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard' }) => {
  // Pass the article data in state so we don't have to re-fetch immediately on the next page
  const linkState = { article };

  if (variant === 'featured') {
    return (
      <Link to={`/article/${article.id}`} state={linkState} className="group block relative h-full min-h-[400px] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
          <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-bold uppercase mb-3 rounded-sm">
            {article.category}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 leading-tight group-hover:text-red-400 transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-300 line-clamp-2 md:line-clamp-3 mb-4 text-sm md:text-base">
            {article.summary}
          </p>
          <div className="flex items-center text-gray-400 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {article.publishedAt}
            <span className="mx-2">•</span>
            By {article.author}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.id}`} state={linkState} className="group flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
           <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-red-600 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">{article.summary}</p>
          <div className="flex items-center text-gray-400 text-[10px] uppercase font-medium">
             <span className="text-red-600 mr-2">{article.category}</span>
             <Clock className="h-3 w-3 mr-1" />
             {article.publishedAt}
          </div>
        </div>
      </Link>
    );
  }

  // Standard
  return (
    <Link to={`/article/${article.id}`} state={linkState} className="group flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase rounded-sm">
            {article.category}
          </span>
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-red-600 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
          {article.summary}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto border-t pt-3">
          <span>{article.publishedAt}</span>
          <span>{article.author}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;