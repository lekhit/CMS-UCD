import { ContentItem, MediaAsset, BrandGuideline } from './types';

export const sampleArticles: ContentItem[] = [
  {
    id: 'a1',
    title: 'Getting Started with Modern Web Design',
    type: 'article',
    status: 'published',
    author: 'Sarah Chen',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-18',
    description: 'A comprehensive guide to modern web design principles including responsive layouts, typography, and color theory.',
    tags: ['design', 'web', 'tutorial'],
    category: 'Design',
    body: 'Modern web design has evolved significantly over the past decade...'
  },
  {
    id: 'a2',
    title: 'Brand Identity Best Practices for 2025',
    type: 'article',
    status: 'published',
    author: 'Marcus Williams',
    createdAt: '2025-01-12',
    updatedAt: '2025-01-14',
    description: 'Explore the latest trends and best practices in building a cohesive brand identity across digital platforms.',
    tags: ['branding', 'identity', 'strategy'],
    category: 'Branding',
    body: 'Building a strong brand identity requires consistency across all touchpoints...'
  },
  {
    id: 'a3',
    title: 'The Art of Visual Storytelling',
    type: 'article',
    status: 'draft',
    author: 'Emily Rodriguez',
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20',
    description: 'How to use visual elements to tell compelling stories that engage your audience.',
    tags: ['storytelling', 'visual', 'content'],
    category: 'Content',
    body: 'Visual storytelling is one of the most powerful tools in a content creator\'s arsenal...'
  },
  {
    id: 'a4',
    title: 'Color Psychology in Digital Marketing',
    type: 'article',
    status: 'review',
    author: 'David Kim',
    createdAt: '2025-01-18',
    updatedAt: '2025-01-19',
    description: 'Understanding how colors influence user behavior and decision-making in digital spaces.',
    tags: ['color', 'psychology', 'marketing'],
    category: 'Marketing',
    body: 'Colors play a crucial role in how users perceive and interact with digital content...'
  },
  {
    id: 'a5',
    title: 'Typography Essentials for Content Creators',
    type: 'article',
    status: 'published',
    author: 'Sarah Chen',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-12',
    description: 'Master the fundamentals of typography to enhance readability and visual appeal.',
    tags: ['typography', 'design', 'fonts'],
    category: 'Design',
    body: 'Typography is the art and technique of arranging type to make written language legible...'
  },
  {
    id: 'a6',
    title: 'Content Strategy for Growing Brands',
    type: 'article',
    status: 'draft',
    author: 'Marcus Williams',
    createdAt: '2025-01-22',
    updatedAt: '2025-01-22',
    description: 'Develop a scalable content strategy that grows with your brand.',
    tags: ['strategy', 'content', 'growth'],
    category: 'Strategy',
    body: 'A well-crafted content strategy is the backbone of any successful brand...'
  }
];

export const sampleGraphics: ContentItem[] = [
  {
    id: 'g1',
    title: 'Hero Banner — Spring Campaign',
    type: 'graphic',
    status: 'published',
    author: 'Alex Turner',
    createdAt: '2025-01-14',
    updatedAt: '2025-01-16',
    description: 'Main hero banner for the spring marketing campaign featuring gradient backgrounds and modern typography.',
    tags: ['banner', 'campaign', 'spring'],
    thumbnail: 'https://picsum.photos/seed/hero1/400/250',
    category: 'Banners'
  },
  {
    id: 'g2',
    title: 'Social Media Kit — Instagram',
    type: 'graphic',
    status: 'published',
    author: 'Jordan Lee',
    createdAt: '2025-01-11',
    updatedAt: '2025-01-13',
    description: 'Complete set of Instagram templates including stories, posts, and carousel designs.',
    tags: ['social', 'instagram', 'templates'],
    thumbnail: 'https://picsum.photos/seed/insta1/400/250',
    category: 'Social Media'
  },
  {
    id: 'g3',
    title: 'Product Catalog Cover Design',
    type: 'graphic',
    status: 'review',
    author: 'Alex Turner',
    createdAt: '2025-01-19',
    updatedAt: '2025-01-20',
    description: 'Premium product catalog cover with minimalist design approach and brand-aligned color palette.',
    tags: ['catalog', 'product', 'cover'],
    thumbnail: 'https://picsum.photos/seed/catalog1/400/250',
    category: 'Print'
  },
  {
    id: 'g4',
    title: 'Email Newsletter Header',
    type: 'graphic',
    status: 'published',
    author: 'Jordan Lee',
    createdAt: '2025-01-08',
    updatedAt: '2025-01-09',
    description: 'Weekly newsletter header graphic with dynamic layout and responsive design elements.',
    tags: ['email', 'newsletter', 'header'],
    thumbnail: 'https://picsum.photos/seed/email1/400/250',
    category: 'Email'
  },
  {
    id: 'g5',
    title: 'Infographic — Annual Report Highlights',
    type: 'graphic',
    status: 'draft',
    author: 'Alex Turner',
    createdAt: '2025-01-21',
    updatedAt: '2025-01-21',
    description: 'Data visualization infographic summarizing key annual report metrics and achievements.',
    tags: ['infographic', 'data', 'report'],
    thumbnail: 'https://picsum.photos/seed/info1/400/250',
    category: 'Infographics'
  }
];

export const sampleVideos: ContentItem[] = [
  {
    id: 'v1',
    title: 'Brand Story — Company Overview',
    type: 'video',
    status: 'published',
    author: 'Chris Morgan',
    createdAt: '2025-01-05',
    updatedAt: '2025-01-07',
    description: 'A 3-minute brand story video showcasing company mission, values, and team culture.',
    tags: ['brand', 'story', 'overview'],
    thumbnail: 'https://picsum.photos/seed/vid1/400/250',
    category: 'Brand'
  },
  {
    id: 'v2',
    title: 'Product Tutorial — New Features Walkthrough',
    type: 'video',
    status: 'published',
    author: 'Patricia Hale',
    createdAt: '2025-01-09',
    updatedAt: '2025-01-10',
    description: 'Step-by-step tutorial video demonstrating the latest product features and updates.',
    tags: ['tutorial', 'product', 'features'],
    thumbnail: 'https://picsum.photos/seed/vid2/400/250',
    category: 'Tutorials'
  },
  {
    id: 'v3',
    title: 'Customer Testimonial Compilation',
    type: 'video',
    status: 'review',
    author: 'Chris Morgan',
    createdAt: '2025-01-17',
    updatedAt: '2025-01-18',
    description: 'Compilation of customer testimonials and success stories from Q4 2024.',
    tags: ['testimonial', 'customer', 'success'],
    thumbnail: 'https://picsum.photos/seed/vid3/400/250',
    category: 'Testimonials'
  },
  {
    id: 'v4',
    title: 'Behind the Scenes — Design Process',
    type: 'video',
    status: 'draft',
    author: 'Patricia Hale',
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20',
    description: 'A look behind the scenes at our creative design process from concept to final delivery.',
    tags: ['behind-scenes', 'design', 'process'],
    thumbnail: 'https://picsum.photos/seed/vid4/400/250',
    category: 'Culture'
  }
];

export const sampleMedia: MediaAsset[] = [
  { id: 'm1', name: 'brand-logo-primary.svg', type: 'image', size: '24 KB', url: 'https://picsum.photos/seed/logo1/200/200', uploadedAt: '2025-01-02', dimensions: '200×200', tags: ['logo', 'brand'] },
  { id: 'm2', name: 'hero-background-spring.jpg', type: 'image', size: '2.4 MB', url: 'https://picsum.photos/seed/hero2/800/400', uploadedAt: '2025-01-05', dimensions: '1920×1080', tags: ['hero', 'background'] },
  { id: 'm3', name: 'team-photo-2025.jpg', type: 'image', size: '3.1 MB', url: 'https://picsum.photos/seed/team1/800/400', uploadedAt: '2025-01-08', dimensions: '2400×1600', tags: ['team', 'people'] },
  { id: 'm4', name: 'product-shot-alpha.png', type: 'image', size: '1.8 MB', url: 'https://picsum.photos/seed/prod1/400/400', uploadedAt: '2025-01-10', dimensions: '1000×1000', tags: ['product', 'photo'] },
  { id: 'm5', name: 'icon-set-navigation.svg', type: 'image', size: '18 KB', url: 'https://picsum.photos/seed/icon1/100/100', uploadedAt: '2025-01-12', dimensions: '24×24', tags: ['icon', 'ui'] },
  { id: 'm6', name: 'social-template-01.png', type: 'image', size: '890 KB', url: 'https://picsum.photos/seed/social1/400/400', uploadedAt: '2025-01-14', dimensions: '1080×1080', tags: ['social', 'template'] },
  { id: 'm7', name: 'newsletter-banner.png', type: 'image', size: '540 KB', url: 'https://picsum.photos/seed/news1/600/200', uploadedAt: '2025-01-15', dimensions: '1200×400', tags: ['newsletter', 'banner'] },
  { id: 'm8', name: 'brand-guidelines-v3.pdf', type: 'document', size: '4.2 MB', url: '#', uploadedAt: '2025-01-03', tags: ['brand', 'guidelines'] },
  { id: 'm9', name: 'promo-video-raw.mp4', type: 'video', size: '128 MB', url: 'https://picsum.photos/seed/vidcover1/400/250', uploadedAt: '2025-01-16', tags: ['video', 'promo'] },
  { id: 'm10', name: 'texture-paper-overlay.jpg', type: 'image', size: '620 KB', url: 'https://picsum.photos/seed/tex1/400/400', uploadedAt: '2025-01-18', dimensions: '2000×2000', tags: ['texture', 'overlay'] },
  { id: 'm11', name: 'pattern-geometric-bg.svg', type: 'image', size: '12 KB', url: 'https://picsum.photos/seed/pat1/400/400', uploadedAt: '2025-01-19', dimensions: '500×500', tags: ['pattern', 'background'] },
  { id: 'm12', name: 'headshot-ceo.jpg', type: 'image', size: '1.2 MB', url: 'https://picsum.photos/seed/head1/300/300', uploadedAt: '2025-01-20', dimensions: '800×800', tags: ['headshot', 'people'] },
];

export const brandGuidelines: BrandGuideline[] = [
  {
    id: 'b1',
    section: 'Colors',
    title: 'Primary Palette',
    description: 'Our primary brand colors should be used consistently across all materials to maintain brand recognition.',
    values: undefined,
    color: { name: 'Primary Blue', hex: '#2563EB', rgb: '37, 99, 235' }
  },
  {
    id: 'b2',
    section: 'Colors',
    title: 'Secondary Palette',
    description: 'Secondary colors complement the primary palette and add depth to our visual communications.',
    values: undefined,
    color: { name: 'Accent Teal', hex: '#0D9488', rgb: '13, 148, 136' }
  },
  {
    id: 'b3',
    section: 'Colors',
    title: 'Neutral Tones',
    description: 'Neutral tones are used for backgrounds, text, and supporting elements.',
    values: undefined,
    color: { name: 'Slate Dark', hex: '#1E293B', rgb: '30, 41, 59' }
  },
  {
    id: 'b4',
    section: 'Typography',
    title: 'Primary Typeface',
    description: 'Our primary typeface is used for headlines and key messaging across all brand materials.',
    values: undefined,
    font: { name: 'Inter', family: 'Inter, sans-serif', weight: '600-800' }
  },
  {
    id: 'b5',
    section: 'Typography',
    title: 'Body Typeface',
    description: 'The body typeface ensures optimal readability for long-form content and communications.',
    values: undefined,
    font: { name: 'Source Sans 3', family: 'Source Sans 3, sans-serif', weight: '400-600' }
  },
  {
    id: 'b6',
    section: 'Logo Usage',
    title: 'Logo Guidelines',
    description: 'The logo must always maintain clear space equal to the height of the logomark on all sides. Minimum size is 32px for digital and 0.5 inches for print.',
    values: ['Maintain clear space around logo', 'Never stretch or distort the logo', 'Use approved color variants only', 'Minimum contrast ratio of 4.5:1 against backgrounds']
  },
  {
    id: 'b7',
    section: 'Imagery',
    title: 'Photography Style',
    description: 'All photography should convey authenticity, diversity, and professionalism. Images should feel natural and unposed.',
    values: ['Use natural lighting when possible', 'Maintain consistent color grading', 'Avoid overly staged compositions', 'Ensure diverse representation']
  },
  {
    id: 'b8',
    section: 'Voice & Tone',
    title: 'Brand Voice',
    description: 'Our brand voice is confident yet approachable. We communicate with clarity and purpose.',
    values: ['Professional but not stiff', 'Knowledgeable but not condescending', 'Warm but not casual', 'Clear and concise messaging']
  }
];
