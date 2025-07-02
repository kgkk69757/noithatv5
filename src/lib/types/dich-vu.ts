export interface BaiViet {
  id: number;
  danhmucbaiviet_id: number;
  tieudebaiviet: string;
  slug: string;
  img: string;
  img_alt: string;
  noidung: string;
  meta_title: string;
  meta_description: string;
  keyword: string;
  canonical_url: string;
  og_image: string | null;
  thu_tu_hien_thi: number;
  trangthai: boolean;
  created_at: string;
  updated_at: string;
  aloaibaiviet_id: number;
}

export interface TrangDichVu {
  id: number;
  tieude: string;
  mota: string;
  anh_url: string;
  baiviet: BaiViet;
}

export interface TrangDichVuResponse {
  success: boolean;
  data: TrangDichVu;
  message?: string;
}