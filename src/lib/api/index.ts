import type {
  Banner,
  ServiceGridItem,
  BannerTitleSection,
  BannerTitleSectionA,
  ServiceCard,
  Post,
  PostCategory,
  ApiResponse,
  CategoryDetail,
  StatsCard,
  ExperienceSection,
  HorizontalCard,
  Service,
  Partner,
} from "../types/index";

// Constants
const DEFAULT_TITLE = "Chưa có tiêu đề";
const DEFAULT_BACKGROUND = "../images/image-11.png";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Environment validation
if (!import.meta.env.BASE_API_URL) {
  throw new Error("BASE_API_URL environment variable is required");
}

const API_BASE = import.meta.env.BASE_API_URL;

// Validation functions
function validateBannerTitleSection(data: any): data is BannerTitleSection {
  return (
    typeof data === "object" &&
    typeof data.id === "number" &&
    typeof data.banner_url === "string" &&
    typeof data.banner_alt === "string" &&
    typeof data.title === "string" &&
    typeof data.anh_url === "string" &&
    typeof data.alt_anh === "string" &&
    typeof data.has_banner === "boolean" &&
    typeof data.has_title === "boolean" &&
    typeof data.has_anh === "boolean"
  );
}

function validateBannerTitleSectionA(data: any): data is BannerTitleSectionA {
  return (
    typeof data === "object" &&
    typeof data.id === "number" &&
    typeof data.banner_url === "string" &&
    typeof data.banner_alt === "string" &&
    typeof data.title === "string" &&
    typeof data.mota === "string" &&
    typeof data.has_banner === "boolean" &&
    typeof data.has_title === "boolean" &&
    typeof data.has_mota === "boolean"
  );
}

function validateStatsCard(card: any): card is StatsCard {
  return (
    typeof card === "object" &&
    typeof card.id === "number" &&
    typeof card.title === "string" &&
    typeof card.number === "string" &&
    typeof card.description === "string" &&
    typeof card.color === "string" &&
    typeof card.thu_tu === "number" &&
    typeof card.trang_thai === "boolean"
  );
}

// Helper function for display logic
export function getDisplayValue(card: StatsCard): string {
  if (card.number === "0") {
    return card.title && card.title !== DEFAULT_TITLE ? card.title : "";
  }

  if (card.title && card.title !== DEFAULT_TITLE) {
    return card.title;
  }

  return card.number || "";
}

// Helper function for background image
export function getBackgroundImage(
  bannerData: BannerTitleSectionA | null
): string {
  if (bannerData?.has_banner && bannerData.banner_url) {
    return `url('${bannerData.banner_url}')`;
  }
  return `url('${DEFAULT_BACKGROUND}')`;
}

// Helper function for BannerTitleSection background image
export function getBannerBackground(
  bannerData: BannerTitleSection | null
): string {
  if (bannerData?.has_banner && bannerData.banner_url) {
    return `url('${bannerData.banner_url.trim()}')`;
  }
  return `url('${DEFAULT_BACKGROUND}')`;
}

// Helper function for BannerTitleSection additional image
export function getBannerImage(
  bannerData: BannerTitleSection | null
): string | null {
  if (bannerData?.has_anh && bannerData.anh_url) {
    return bannerData.anh_url.trim();
  }
  return null;
}

export { DEFAULT_TITLE, DEFAULT_BACKGROUND };
// banner
export async function fetchBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_API_URL}/banners`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu banner");
    }
    const json = await res.json();
    return json.data.filter((banner: Banner) => banner.is_active);
  } catch (error) {
    console.error("Error fetching banners:", error);
    // Trả về array rỗng thay vì fallback data
    return [];
  }
}
// Dự án nội thất
export async function fetchServiceGrid(): Promise<ServiceGridItem[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_API_URL}/service-grid`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu service grid");
    }
    const json = await res.json();
    return json.success
      ? json.data.filter((item: ServiceGridItem) => item.trang_thai)
      : [];
  } catch (error) {
    console.error("Error fetching service grid:", error);
    return [];
  }
}

export async function fetchBannerTitleSection(): Promise<BannerTitleSection | null> {
  try {
    const res = await fetch(
      `${import.meta.env.BASE_API_URL}/banner-title-section`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const json = await res.json();
    
    if (!json.success) {
      console.warn("API returned success: false for banner title section");
      return null;
    }
    
    if (!validateBannerTitleSection(json.data)) {
      console.error("Invalid banner title section data structure:", json.data);
      return null;
    }
    
    return json.data;
  } catch (error) {
    console.error("Error fetching banner title section:", error);
    return null;
  }
}

export async function fetchBannerTitleSectionA(): Promise<BannerTitleSectionA | null> {
  try {
    const res = await fetch(`${API_BASE}/banner-title-section-a`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (!json.success) {
      console.warn("API returned success: false for banner title section A");
      return null;
    }

    if (!validateBannerTitleSectionA(json.data)) {
      console.error(
        "Invalid banner title section A data structure:",
        json.data
      );
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching banner title section A:", error);
    return null;
  }
}

export async function fetchStatsCards(): Promise<StatsCard[]> {
  try {
    const res = await fetch(`${API_BASE}/stats-cards`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (!json.success) {
      console.warn("API returned success: false for stats cards");
      return [];
    }

    if (!Array.isArray(json.data)) {
      console.error("Stats cards data is not an array:", json.data);
      return [];
    }

    return json.data
      .filter((card: any) => validateStatsCard(card) && card.trang_thai)
      .sort((a: StatsCard, b: StatsCard) => a.thu_tu - b.thu_tu);
  } catch (error) {
    console.error("Error fetching stats cards:", error);
    return [];
  }
}

export async function fetchServiceCards(): Promise<ServiceCard[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_API_URL}/service-cards`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu service cards");
    }
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching service cards:", error);
    return [];
  }
}

export async function fetchPosts(limit?: number): Promise<Post[]> {
  try {
    const url = limit
      ? `${import.meta.env.BASE_API_URL}/baiviets?per_page=${limit}`
      : `${import.meta.env.BASE_API_URL}/baiviets`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu bài viết");
    }
    const json: ApiResponse = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function fetchFeaturedPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${import.meta.env.BASE_API_URL}/baiviets?featured=true&per_page=5`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch bài viết nổi bật");
    }
    const json: ApiResponse = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    const posts = await fetchPosts(3);
    return posts;
  }
}

export async function fetchPostsByCategory(
  categoryId: number
): Promise<Post[]> {
  try {
    const res = await fetch(
      `${import.meta.env.BASE_API_URL}/baiviets?danhmuc_id=${categoryId}`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch bài viết theo danh mục");
    }
    const json: ApiResponse = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

export async function fetchPostCategories(): Promise<PostCategory[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_API_URL}/danhmuc-baiviets`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch danh mục bài viết");
    }
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching post categories:", error);
    return [];
  }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_API_URL}/baiviets/${slug}`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch chi tiết bài viết");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching post detail:", error);
    return null;
  }
}

export async function fetchCategoryDetail(
  slug: string
): Promise<CategoryDetail | null> {
  try {
    const res = await fetch(
      `${import.meta.env.BASE_API_URL}/danhmuc-baiviets/${slug}`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch chi tiết danh mục");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching category detail:", error);
    return null;
  }
}

export async function fetchExperienceSection(): Promise<ExperienceSection | null> {
  try {
    const res = await fetch(
      `${import.meta.env.BASE_API_URL}/experience-section`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch experience section");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching experience section:", error);
    return null;
  }
}

export async function fetchHorizontalCards(): Promise<HorizontalCard[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_API_URL}/horizontal-cards`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu horizontal cards");
    }
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching horizontal cards:", error);
    return [];
  }
}

// Footer API functions are now in Footer.ts
export { fetchFooterInfo, fetchPolicies } from "./Footer";




// Services API
export interface ServiceApiResponse {
  success: boolean;
  data: Service[];
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${import.meta.env.BASE_API_URL}/services`);
    const result: ServiceApiResponse = await response.json();
    
    if (result.success) {
      return result.data.sort((a, b) => a.sort_order - b.sort_order);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Partners API
export async function fetchPartners(): Promise<Partner[]> {
  try {
    const response = await fetch(`${import.meta.env.BASE_API_URL}/partners`);
    if (!response.ok) {
      throw new Error('Failed to fetch partners');
    }
    const json = await response.json();
    return json.data as Partner[];
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
}

// Media Contents API
export async function fetchMediaContents(): Promise<MediaContentsResponse | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_API_URL}/media-contents`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const json = await res.json();
    
    if (!json.success) {
      console.warn("API returned success: false for media contents");
      return null;
    }
    
    return json as MediaContentsResponse;
  } catch (error) {
    console.error("Error fetching media contents:", error);
    return null;
  }
}

// Helper function to convert API data to legacy format
export function convertToVideoItems(mediaContents: MediaContent[]): VideoItem[] {
  return mediaContents
    .filter(item => item.is_youtube)
    .sort((a, b) => a.thu_tu - b.thu_tu)
    .map(item => ({
      id: item.id.toString(),
      title: item.title,
      media_id: item.media_id || '',
      is_youtube: item.is_youtube,
      embed_code: item.embed_code
    }));
}

export function convertToTikTokItems(mediaContents: MediaContent[]): TikTokItem[] {
  return mediaContents
    .filter(item => item.is_tiktok)
    .sort((a, b) => a.thu_tu - b.thu_tu)
    .map(item => ({
      id: item.id.toString(),
      title: item.title,
      media_id: item.media_id || '',
      is_youtube: item.is_youtube,
      thumbnail: item.thumbnail_url || '',
      embed_url: item.media_url
    }));
}

export * from './dich-vu';
