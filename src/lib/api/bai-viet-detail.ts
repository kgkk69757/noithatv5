// src/lib/api/bai-viet-detail.ts

import type { Article } from "../types/bai-viet";

export async function fetchBaiVietBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${import.meta.env.BASE_API_URL}/baiviets/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data as Article; // Return the single article data
  } catch (error) {
    console.error(`Error fetching bai viet with slug ${slug}:`, error);
    return null; // Return null on error
  }
}