export interface Phone {
  id: number;
  name: string;
  number: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

export interface PhoneApiResponse {
  success: boolean;
  data: Phone[];
}

export interface SiteSettings {
  logo: {
    file_url: string;
    alt_text: string;
  };
  favicon: {
    file_url: string;
    alt_text: string;
  };
  site_name: string;
}

export interface SiteSettingsApiResponse {
  success: boolean;
  data: SiteSettings;
}
  
export interface CompanyInfo {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  extended_description: string;
  video_id: string;
  video_title: string | null;
  is_active: boolean;
  youtube_url: string;
  youtube_embed_url: string;
  youtube_thumbnail: string;
  embed_code: string;
}

export interface CompanyInfoApiResponse {
  success: boolean;
  data: CompanyInfo;
  generated_at: string;
}
