export const API_URL = import.meta.env.PROD
    ? 'https://inspired-api-roman83mars.amvera.io'
    : 'http://localhost:8024';
export const GOODS_URL = `${API_URL}/api/goods`
export const CATEGORY_URL = `${API_URL}/api/categories`
export const COLORS_URL = `${API_URL}/api/colors`
export const ORDER_URL = `${API_URL}/api/order`