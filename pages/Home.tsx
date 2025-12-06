import React, { useEffect, useState } from 'react';
import { fetchNewsByCategory } from '../services/newsService';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import { Loader2, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const [featured, setFeatured] = useState<Article | null>(null);
  const [topStories, setTopStories] = useState<Article[]>([]);
  const [techNews, setTechNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        // Fetch specific categories concurrently
        const [general, tech] = await Promise.all([
          fetchNewsByCategory('Latest Global News'),
          fetchNewsByCategory('Technology')
        ]);
        
        if (general.length > 0) {
          setFeatured(general[0]);
          setTopStories(general.slice(1, 6));
        }
        
        setTechNews(tech.slice(0, 4));
      } catch (e) {
        console.error("Failed to load home news", e);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
        <p className="text-gray-500 font-medium animate-pulse">Curating today's headlines...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Article - Takes up 2 columns */}
        <div className="lg:col-span-2 min-h-[400px] lg:min-h-[500px]">
          {featured && <ArticleCard article={featured} variant="featured" />}
        </div>

        {/* Top Stories Sidebar - Takes up 1 column */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
          <div className="flex items-center space-x-2 mb-4 pb-2 border-b-2 border-red-600">
             <TrendingUp className="h-5 w-5 text-red-600" />
             <h2 className="text-xl font-bold text-gray-900 uppercase">Top Stories</h2>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-2 no-scrollbar">
            {topStories.map(article => (
              <ArticleCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
            Technology & Future
          </h2>
          <a href="#/category/tech" className="text-red-600 font-semibold hover:underline text-sm">View All</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techNews.map(article => (
            <div key={article.id} className="h-full">
              <ArticleCard article={article} variant="standard" />
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <div className="bg-gray-900 text-white rounded-lg p-8 text-center md:text-left md:flex items-center justify-between">
         <div>
            <h3 className="text-2xl font-bold mb-2">Subscribe to GNN Daily</h3>
            <p className="text-gray-400">Get the most accurate AI-curated news delivered to your inbox.</p>
         </div>
         <div className="mt-4 md:mt-0 flex gap-2">
            <input type="email" placeholder="Your email" className="px-4 py-2 rounded text-black focus:outline-none" />
            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold transition-colors">Join</button>
         </div>
      </div>
    </div>
  );
};

export default Home;