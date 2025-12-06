import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchNews } from '../services/newsService';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import { Loader2, SearchX } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const data = await searchNews(query);
        setResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Search Results for <span className="text-red-600">"{query}"</span>
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-red-600" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
           <SearchX className="h-16 w-16 mb-4 text-gray-300" />
           <p className="text-lg">No results found matching your query.</p>
           <p className="text-sm">Try using different keywords.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;