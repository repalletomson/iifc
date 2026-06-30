import React from 'react';
import { Calendar } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  author: string;
  designation: string;
  published_date: string;
  content: string;
  is_active: string;
}

interface PostCardProps {
  post: Post;
  isActive: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
}

export function PostCard({ post, isActive, onClick, theme }: PostCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl transition-all border ${
        isActive
          ? theme === 'light'
            ? 'bg-accent/5 border-accent/30 shadow-sm'
            : 'bg-[#C13584]/10 border-[#C13584]/30'
          : theme === 'light'
            ? 'bg-card border-border hover:border-accent/30 hover:bg-accent/5'
            : 'bg-[#0a0a0a] border-white/5 hover:border-white/10 hover:bg-[#111]'
      }`}
    >
      <h4
        className={`text-sm font-semibold leading-snug mb-1 line-clamp-2 ${
          theme === 'light' ? 'text-foreground' : 'text-white'
        }`}
      >
        {post.title}
      </h4>
      <p className={`text-xs ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}`}>
        {post.author}
      </p>
      <div
        className={`flex items-center gap-1 mt-1 text-[10px] ${
          theme === 'light' ? 'text-muted-foreground' : 'text-gray-600'
        }`}
      >
        <Calendar className="w-3 h-3" />
        {post.published_date}
      </div>
    </button>
  );
}
