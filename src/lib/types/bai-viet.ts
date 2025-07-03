// src/lib/types/bai-viet.ts

export interface ArticleCategory {
  id: number;
  tendanhmucbaiviet: string;
  slug: string;
  thu_tu: number;
}

export interface ArticleTag {
  id: number;
  tenthe: string;
  slug: string;
}

export interface ArticleImage {
  id: number;
  img_url: string;
  img_alt: string;
}

export interface Article {
  id: number;
  tieudebaiviet: string;
  slug: string;
  img_url: string;
  img_alt: string;
  meta_title: string;
  meta_description: string;
  noidung: string;
  thu_tu_hien_thi: number;
  danhmuc: ArticleCategory | null; // Can be null if no category
  thes: ArticleTag[];
  created_at: string;
  created_at_full: string;
  updated_at: string;
  // Fields specific to detail page, might be undefined in listing
  keyword?: string;
  canonical_url?: string;
  og_image_url?: string;
  anhbaiviets?: ArticleImage[];
}
