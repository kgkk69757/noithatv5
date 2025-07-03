// Footer related types
export type TieuDeBaiVietFooter = {
  id: number;
  tentieude: string;
  created_at: string;
  updated_at: string;
};

export type AloaiBaiViet = {
  id: number;
  loai: string;
  created_at: string;
  updated_at: string;
};

export type FooterPost = {
  id: number;
  tieudebaivietfooter_id: number;
  aloaibaiviet_id: number;
  noidung: string;
  trangthai: number;
  created_at: string;
  updated_at: string;
  tieudebaivietfooter: TieuDeBaiVietFooter;
  aloaibaiviet: AloaiBaiViet;
};

export type FooterApiResponse = {
  success: boolean;
  data: FooterPost[];
};

export type RegistrationFormRequest = {
  ho_va_ten: string;
  so_dien_thoai: string;
};

export type RegistrationFormResponse = {
  success: boolean;
  message?: string;
};

export type ImageAlt = {
  id: number;
  img: string;
  created_at: string;
  updated_at: string;
};

export type CompanyInfo = {
  logo: string;
  logo_alt: string;
  text: string;
  footer_title: string;
};