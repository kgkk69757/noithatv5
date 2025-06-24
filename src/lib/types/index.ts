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
  has_banner: boolean;
  has_title: boolean;
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