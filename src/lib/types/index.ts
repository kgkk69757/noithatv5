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