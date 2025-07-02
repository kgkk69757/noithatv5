export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  image_url: string;
  link: string;
  link_name: string;
  position: number | null;
  is_active: boolean;
  status_text: string;
  created_at: string;
  updated_at: string;
  created_at_formatted: string;
  updated_at_formatted: string;
};

export type ServiceGridItem = {
  id: number;
  vi_tri: string;
  trang_thai: boolean;
  baiviet: {
    id: number;
    tieudebaiviet: string;
    slug: string;
    img_url: string;
    img_alt: string;
    meta_title: string;
    meta_description: string;
    noidung_excerpt: string;
    url: string;
  };
};

export type BannerTitleSection = {
  id: number;
  banner_url: string;
  banner_alt: string;
  title: string;
  anh_url: string;
  alt_anh: string;
  has_banner: boolean;
  has_title: boolean;
  has_anh: boolean;
  updated_at: string;
  created_at: string;
};

export type BannerTitleSectionA = {
  id: number;
  banner_url: string;
  banner_alt: string;
  title: string;
  mota: string;
  has_banner: boolean;
  has_title: boolean;
  has_mota: boolean;
  updated_at: string;
  created_at: string;
};

export type StatsCard = {
  id: number;
  title: string;
  number: string;
  description: string;
  color: string;
  thu_tu: number;
  trang_thai: boolean;
};

export type ServiceCard = {
  id: number;
  thu_tu: number;
  baiviet: {
    id: number;
    tieudebaiviet: string;
    slug: string;
    img_url: string;
    img_alt: string;
    meta_title: string;
    meta_description: string;
    noidung_excerpt: string;
    url: string;
    created_at: string;
  };
};

export type Post = {
  id: number;
  tieudebaiviet: string;
  slug: string;
  img_url: string;
  img_alt: string;
  meta_title: string;
  meta_description: string;
  noidung: string;
  thu_tu_hien_thi: number;
  keyword?: string;
  canonical_url?: string;
  og_image_url?: string | null;
  danhmuc: {
    id: number;
    tendanhmucbaiviet: string;
    slug: string;
    thu_tu: number;
  };
  thes: Array<{
    id: number;
    tenthe: string;
    slug: string;
  }>;
  anhbaiviets?: Array<any>;
  created_at: string;
  created_at_full: string;
  updated_at: string;
};

export type PostCategory = {
  id: number;
  tendanhmucbaiviet: string;
  slug: string;
  thu_tu: number;
  baiviets_count: number;
  created_at: string;
  updated_at: string;
};

export type ApiResponse = {
  success: boolean;
  data: Post[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
};

export type CategoryDetail = {
  danhmuc: {
    id: number;
    tendanhmucbaiviet: string;
    slug: string;
  };
  baiviets: Post[];
};

export type ExperienceSection = {
  id: number;
  experience_number: string;
  experience_title: string;
  experience_description: string;
  video_thumbnail_url: string;
  video_thumbnail_alt: string | null;
  youtube_video_id: string;
  youtube_video_url: string;
  section_active: boolean;
  has_video: boolean;
  has_custom_thumbnail: boolean;
  updated_at: string;
  created_at: string;
};

export type HorizontalCard = {
  id: number;
  thu_tu: number;
  trang_thai: boolean;
  baiviet: {
    id: number;
    tieudebaiviet: string;
    slug: string;
    img_url: string;
    img_alt: string;
    meta_description: string;
    link: string;
  };
};

// Footer types are now in Footer.ts

export type Service = {
  id: number;
  title: string;
  icon_image_url: string;
  icon_alt: string;
  description: string;
  fanpage_url: string;
  phone_number: string;
  aos_delay: number;
  sort_order: number;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
  logo_alt: string;
  description?: string | null;
  website_url?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Global type definitions for media components


// Media section configuration
export interface MediaSectionConfig {
  autoplay?: boolean;
  autoplayDelay?: number;
  slidesPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  spaceBetween?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}



// Media Manager configuration interface
export interface MediaManagerConfig {
  responsive: {
    mobile: { slidesPerView: number; spaceBetween: number };
    tablet: { slidesPerView: number; spaceBetween: number };
    desktop: { slidesPerView: number; spaceBetween: number };
  };
  autoplay: {
    enabled: boolean;
    delay: number;
    pauseOnHover: boolean;
  };
  lazyLoad: {
    enabled: boolean;
    threshold: number;
  };
}


// Media content types for Tttt component
export type MediaContent = {
  id: number;
  title: string;
  type: string;
  section: string;
  embed_code: string;
  media_url: string;
  media_id: string | null;
  thumbnail_url: string | null;
  thumbnail_alt: string | null;
  thu_tu: number;
  is_youtube: boolean;
  is_tiktok: boolean;
};

export type MediaContentsResponse = {
  success: boolean;
  data: {
    video_section: MediaContent[];
    tiktok_section: MediaContent[];
  };
  meta: {
    total_videos: number;
    total_tiktoks: number;
    total_items: number;
    generated_at: string;
  };
};

// Legacy types for backward compatibility
export type VideoItem = {
  id: string;
  title: string;
  media_id: string;
  is_youtube: boolean;
  embed_code?: string;
};

export type TikTokItem = {
  id: string;
  title: string;
  media_id: string;
  is_youtube: boolean;
  thumbnail: string;
  embed_url: string;
};
export * from './dich-vu';