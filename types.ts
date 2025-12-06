export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  author: string;
  imageUrl: string;
  content?: string; // Full content is loaded on demand
  sourceUrl?: string; // From grounding
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export type Category = 'General' | 'World' | 'Politics' | 'Business' | 'Tech' | 'Sports' | 'Entertainment' | 'Health';

export interface SearchResult {
  query: string;
  articles: Article[];
}