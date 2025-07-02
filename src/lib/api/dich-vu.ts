import type { TrangDichVu, TrangDichVuResponse } from '../types/dich-vu';

const BASE_API_URL = import.meta.env.BASE_API_URL || 'https://tshy.io.vn/admin/api';

export async function fetchTrangDichVu(): Promise<TrangDichVu | null> {
  try {
    const response = await fetch(`${BASE_API_URL}/trang-dich-vu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TrangDichVu = await response.json();
    
    // Xử lý URL hình ảnh
    if (data.baiviet?.img && !data.baiviet.img.startsWith('http')) {
      data.baiviet.img = `${BASE_API_URL.replace('/api', '')}/storage/${data.baiviet.img}`;
    }
    
    return data;
  } catch (error) {
    console.error('Lỗi khi fetch trang dịch vụ:', error);
    return null;
  }
}