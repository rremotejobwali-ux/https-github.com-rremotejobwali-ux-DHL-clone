import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Article, Comment } from '../types';
import { generateFullArticle } from '../services/newsService';
import { User, Calendar, MessageSquare, Share2, ThumbsUp, ArrowLeft, Loader2 } from 'lucide-react';

const ArticlePage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // We expect article data to be passed via Router state for smooth transitions. 
  // In a full app, we would also fetch by ID if state is missing (direct link access).
  const [article, setArticle] = useState<Article | null>(state?.article || null);
  const [fullContent, setFullContent] = useState<string>("");
  const [loadingContent, setLoadingContent] = useState(true);
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: 'Alex M.', text: 'This is a crucial development. Thanks for the coverage!', timestamp: '2h ago' },
    { id: '2', user: 'Sarah J.', text: 'I wonder how this will impact the markets next week?', timestamp: '45m ago' }
  ]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!article) {
        // If accessed directly without state, we would typically fetch here.
        // For this demo, we redirect home or show fallback.
        navigate('/');
        return;
    }

    const loadContent = async () => {
      setLoadingContent(true);
      const generated = await generateFullArticle(article.title, article.summary);
      setFullContent(generated);
      setLoadingContent(false);
    };

    loadContent();
  }, [article, navigate]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Math.random().toString(),
      user: 'You',
      text: newComment,
      timestamp: 'Just now'
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };

  if (!article) return null;

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-500 hover:text-red-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
        </button>

        {/* Header */}
        <header className="mb-8">
           <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase rounded-full mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between border-y border-gray-100 py-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{article.author}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {article.publishedAt}
                </div>
              </div>
            </div>
            <div className="flex space-x-3 text-gray-400">
              <button className="hover:text-blue-500 transition-colors"><Share2 className="h-5 w-5" /></button>
              <button className="hover:text-red-500 transition-colors"><ThumbsUp className="h-5 w-5" /></button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10 rounded-xl overflow-hidden shadow-lg h-[400px]">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-lg prose-red max-w-none mb-12">
          {loadingContent ? (
             <div className="space-y-4 animate-pulse">
               <div className="h-4 bg-gray-200 rounded w-full"></div>
               <div className="h-4 bg-gray-200 rounded w-5/6"></div>
               <div className="h-4 bg-gray-200 rounded w-full"></div>
               <div className="h-4 bg-gray-200 rounded w-4/6"></div>
               <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                  <span className="ml-2 text-gray-500 text-sm">Generating full report...</span>
               </div>
             </div>
          ) : (
            <div className="whitespace-pre-line text-gray-800 leading-relaxed font-serif text-lg">
              {fullContent}
            </div>
          )}
        </article>

        {/* Comments Section */}
        <section className="bg-gray-50 rounded-xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-red-600" />
            Comments ({comments.length})
          </h3>
          
          <form onSubmit={handlePostComment} className="mb-8">
            <textarea
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
              rows={3}
              placeholder="Join the discussion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button 
                type="submit" 
                disabled={!newComment.trim()}
                className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-gray-900">{comment.user}</h4>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticlePage;