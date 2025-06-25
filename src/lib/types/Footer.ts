// Footer related types
export type FooterInfo = {
  logo: string;
  logo_alt: string;
  text: string;
  footer_title: string;
};

export type PolicyLink = {
  id: number;
  title: string;
  loai: string;
  id_nguon: number;
  detail: {
    id: number;
    tieu_de: string;
    slug: string;
    url: string;
  };
};

export type PolicyCategory = {
  id: number;
  ten_danh_muc: string;
  slug: string;
  thu_tu: number;
  links: PolicyLink[];
};