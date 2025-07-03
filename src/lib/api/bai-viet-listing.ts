// src/lib/api/bai-viet-listing.ts

import type { Article, ArticleCategory } from "../types/bai-viet";

export async function fetchBaiViets(query?: string, categorySlug?: string): Promise<{ articles: Article[]; categories: ArticleCategory[]; }> {
  try {
    const response = await fetch(`${import.meta.env.BASE_API_URL}/baiviets`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    let articles: Article[] = data.data; // Array of articles

    // Apply filtering if a query is provided
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      articles = articles.filter(article => 
        article.tieudebaiviet.toLowerCase().includes(lowerCaseQuery) ||
        article.noidung.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Apply category filtering if categorySlug is provided
    if (categorySlug) {
      articles = articles.filter(article => 
        article.danhmuc && article.danhmuc.slug === categorySlug
      );
    }

    // Sort articles alphabetically by tieudebaiviet
    articles.sort((a, b) => a.tieudebaiviet.localeCompare(b.tieudebaiviet));

    // Extract unique categories from the *original* full list of articles
    // This ensures all categories are shown in the sidebar, even if no articles from them are currently displayed
    const allArticles: Article[] = data.data; // Use the original data to get all categories
    const categoriesMap = new Map<string, ArticleCategory>();
    allArticles.forEach(article => {
      if (article.danhmuc) {
        categoriesMap.set(article.danhmuc.slug, { tendanhmucbaiviet: article.danhmuc.tendanhmucbaiviet, slug: article.danhmuc.slug, id: article.danhmuc.id, thu_tu: article.danhmuc.thu_tu });
      }
    });
    const categories: ArticleCategory[] = Array.from(categoriesMap.values());

    return { articles, categories }; // Return both articles and unique categories
  } catch (error) {
    console.error("Error fetching bai viets:", error);
    return { articles: [], categories: [] }; // Return empty arrays on error
  }
}
