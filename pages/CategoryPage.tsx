import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsByCategory } from '../services/newsService';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import { Loader2 } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Capitalize for display
  const displayCategory = categoryId 
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) 
    : 'News';

  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true);
      try {
        const data = await fetchNewsByCategory(displayCategory);
        setArticles(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      loadCategory();
    }
  }, [categoryId, displayCategory]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-red-600 mb-4" />
        <p className="text-gray-500">Fetching latest {displayCategory} updates...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
          {displayCategory} <span className="text-red-600">News</span>
        </h1>
        <p className="text-gray-500 mt-2">Latest breaking stories and in-depth coverage from {displayCategory}.</p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No articles found for this category at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;