import type {
  Phone,
  PhoneApiResponse,
  SiteSettings,
  SiteSettingsApiResponse,
  CompanyInfo,
  CompanyInfoApiResponse,
} from "../types/Header";

export async function fetchActivePhones(): Promise<Phone[]> {
  const apiUrl = `${import.meta.env.BASE_API_URL}/phones`; // ✅ Dùng đúng biến
  const res = await fetch(apiUrl);
  const json: PhoneApiResponse = await res.json();

  if (json.success && Array.isArray(json.data)) {
    return json.data.filter((phone) => phone.is_active);
  } else {
    throw new Error("Invalid API response");
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const apiUrl = `${import.meta.env.BASE_API_URL}/site-settings`;
  const res = await fetch(apiUrl);
  const json: SiteSettingsApiResponse = await res.json();

  if (json.success && json.data) {
    return json.data;
  } else {
    throw new Error("Invalid Site Settings API response");
  }
}

export async function fetchCompanyInfo(): Promise<CompanyInfo> {
  const apiUrl = `${import.meta.env.BASE_API_URL}/company-info`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const res = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const json: CompanyInfoApiResponse = await res.json();

    if (json.success && json.data) {
      return json.data;
    } else {
      throw new Error("Invalid Company Info API response");
    }
  } catch (error) {
    console.error('Error fetching company info:', error);
    throw error;
  }
}
