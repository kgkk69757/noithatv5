import type { FooterInfo, PolicyCategory } from "../types/Footer";

// Environment validation
if (!import.meta.env.BASE_API_URL) {
  throw new Error('BASE_API_URL environment variable is required');
}

const API_BASE = import.meta.env.BASE_API_URL;

// Footer API functions
export async function fetchFooterInfo(): Promise<FooterInfo | null> {
  try {
    const res = await fetch(
      `${import.meta.env.BASE_API_URL}/footergioithieu`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu footer");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching footer info:", error);
    return null;
  }
}

export async function fetchPolicies(): Promise<PolicyCategory[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_API_URL}/policies`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu policies");
    }
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching policies:", error);
    return [];
  }
}