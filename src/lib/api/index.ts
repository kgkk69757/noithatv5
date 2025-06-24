import type { Banner } from "../types/index";

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
