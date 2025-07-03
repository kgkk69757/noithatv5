import type { FooterApiResponse, FooterPost, RegistrationFormRequest, RegistrationFormResponse, ImageAlt, CompanyInfo } from "../types/Footer";

// Environment validation
if (!import.meta.env.BASE_API_URL) {
  throw new Error('BASE_API_URL environment variable is required');
}

const API_BASE = import.meta.env.BASE_API_URL;

export async function fetchFooterPosts(): Promise<FooterPost[]> {
  try {
    const res = await fetch(`${API_BASE}/baiviet-footer`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu bài viết footer");
    }
    const json: FooterApiResponse = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching footer posts:", error);
    return [];
  }
}

export async function submitRegistrationForm(data: RegistrationFormRequest): Promise<RegistrationFormResponse> {
  try {
    const response = await fetch(`${API_BASE}/dang-ky-tu-van`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: RegistrationFormResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting registration form:', error);
    return { success: false, message: 'Đã xảy ra lỗi mạng hoặc lỗi server.' };
  }
}

export async function fetchImageAlt(): Promise<ImageAlt | null> {
  try {
    const res = await fetch(`${API_BASE}/image-alts`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu ảnh alt");
    }
    const json: ImageAlt[] = await res.json();
    return json.length > 0 ? json[0] : null;
  } catch (error) {
    console.error("Error fetching image alt:", error);
    return null;
  }
}

export async function fetchCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const res = await fetch(`${API_BASE}/footergioithieu`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu thông tin công ty");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching company info:", error);
    return null;
  }
}