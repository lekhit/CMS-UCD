export type Page = 'dashboard' | 'articles' | 'graphics' | 'videos' | 'media' | 'editor' | 'branding' | 'settings';

export type ContentStatus = 'published' | 'draft' | 'review' | 'archived';
export type ContentType = 'article' | 'graphic' | 'video';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  author: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  tags: string[];
  thumbnail?: string;
  body?: string;
  category?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  url: string;
  uploadedAt: string;
  dimensions?: string;
  tags: string[];
}

export interface BrandGuideline {
  id: string;
  section: string;
  title: string;
  description: string;
  values?: string[];
  color?: { name: string; hex: string; rgb: string };
  font?: { name: string; family: string; weight: string };
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
