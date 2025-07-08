// بررسی محیط اجرا
const isDevelopment = process.env.NODE_ENV === 'development';
console.log('Current environment:', process.env.NODE_ENV); // برای دیباگ

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (isDevelopment ? 'http://localhost:3000' : 'https://aryafoulad-api.pourdian.com');

export const API_ENDPOINTS = {
  // تمام بخش‌های مربوط به aryafoulad حذف شود (unit-locations, mission-orders, rate-settings, warehouse-module و ...)
  // ... existing code ...
  users: {
    base: `${API_BASE_URL}/user/user`,
    getAll: `${API_BASE_URL}/user/user/getAll`,
    getById: (id) => `${API_BASE_URL}/user/user/getOne/${id}`,
    create: `${API_BASE_URL}/user/user/create`,
    update: (id) => `${API_BASE_URL}/user/user/update/${id}`,
    delete: (id) => `${API_BASE_URL}/user/user/delete/${id}`,
    search: `${API_BASE_URL}/user/user/search`,
  },
  roles: {
    base: `${API_BASE_URL}/user/role`,
    getAll: `${API_BASE_URL}/user/role/getAll`,
    getById: (id) => `${API_BASE_URL}/user/role/getOne/${id}`,
    create: `${API_BASE_URL}/user/role/create`,
    update: (id) => `${API_BASE_URL}/user/role/update/${id}`,
    delete: (id) => `${API_BASE_URL}/user/role/delete/${id}`,
  },
  // انبارداری
  warehouse: {
    base: `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse`,
    getAll: `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/getAll`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/getOne/${id}`,
    create: `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/delete/${id}`,
    search: (query) => `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/search?query=${query}`,
  },
  items: {
    base: `${API_BASE_URL}/aryafoulad/warehouse-module/item`,
    getAll: `${API_BASE_URL}/aryafoulad/warehouse-module/item/getAll`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item/getOne/${id}`,
    create: `${API_BASE_URL}/aryafoulad/warehouse-module/item/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item/delete/${id}`,
  },
  inventory: {
    base: `${API_BASE_URL}/aryafoulad/warehouse-module/inventory`,
    getAll: `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/getAll`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/getOne/${id}`,
    create: `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/delete/${id}`,
  },
  itemAssignments: {
    base: `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment`,
    getAll: `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/getAll`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/getOne/${id}`,
    create: `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/delete/${id}`,
  },
  auth: {
    registerEmail: `${API_BASE_URL}/user/auth/register/email`,
    login: `${API_BASE_URL}/user/auth/login`,
    verifyEmail: `${API_BASE_URL}/user/auth/verify/email`,
    resendEmailCode: `${API_BASE_URL}/user/auth/resend-code/email`,
    me: `${API_BASE_URL}/user/auth/me`,
    logout: `${API_BASE_URL}/user/auth/logout`,
  },
  // مقالات
  articles: {
    base: `${API_BASE_URL}/articles`,
    getAll: `${API_BASE_URL}/articles/getAll`,
    getById: (id) => `${API_BASE_URL}/articles/getOne/${id}`,
    getByCategory: (categoryId, limit = 10) => `${API_BASE_URL}/articles/getByCategory/${categoryId}?limit=${limit}`,
    getByTag: (tagId, limit = 10) => `${API_BASE_URL}/articles/getByTag/${tagId}?limit=${limit}`,
    getByTags: (tagIds, limit = 10) => `${API_BASE_URL}/articles/getByTags?tagIds=${tagIds}&limit=${limit}`,
    getByAgency: (agencyId, limit = 10) => `${API_BASE_URL}/articles/getByAgency/${agencyId}?limit=${limit}`,
    search: `${API_BASE_URL}/articles/search`,
    create: `${API_BASE_URL}/articles/create`,
    update: (id) => `${API_BASE_URL}/articles/update/${id}`,
    delete: (id) => `${API_BASE_URL}/articles/delete/${id}`,
  },
  // تگ‌ها
  tags: {
    base: `${API_BASE_URL}/articles/tags`,
    getAll: `${API_BASE_URL}/articles/tags/getAll`,
    getAllWithArticleCount: `${API_BASE_URL}/articles/tags/getAllWithArticleCount`,
    getByClasses: `${API_BASE_URL}/articles/tags/getByClasses`,
    testDatabase: `${API_BASE_URL}/articles/tags/testDatabase`,
    getById: (id) => `${API_BASE_URL}/articles/tags/getOne/${id}`,
    getByName: (name) => `${API_BASE_URL}/articles/tags/getByName/${encodeURIComponent(name)}`,
    getByFamily: (familyId) => `${API_BASE_URL}/articles/tags/getByFamily/${familyId}`,
    search: `${API_BASE_URL}/articles/tags/search`,
    create: `${API_BASE_URL}/articles/tags/create`,
    update: (id) => `${API_BASE_URL}/articles/tags/update/${id}`,
    delete: (id) => `${API_BASE_URL}/articles/tags/delete/${id}`,
  },
  // دسته‌بندی‌ها
  categories: {
    base: `${API_BASE_URL}/articles/categories`,
    getAll: `${API_BASE_URL}/articles/categories/getAll`,
    getById: (id) => `${API_BASE_URL}/articles/categories/getOne/${id}`,
    create: `${API_BASE_URL}/articles/categories/create`,
    update: (id) => `${API_BASE_URL}/articles/categories/update/${id}`,
    delete: (id) => `${API_BASE_URL}/articles/categories/delete/${id}`,
  },
  // آژانس‌ها
  agencies: {
    base: `${API_BASE_URL}/articles/agencies`,
    getAll: `${API_BASE_URL}/articles/agencies/getAll`,
    getById: (id) => `${API_BASE_URL}/articles/agencies/getOne/${id}`,
    create: `${API_BASE_URL}/articles/agencies/create`,
    update: (id) => `${API_BASE_URL}/articles/agencies/update/${id}`,
    delete: (id) => `${API_BASE_URL}/articles/agencies/delete/${id}`,
  },
  // خانواده‌های تگ
  tagFamilies: {
    base: `${API_BASE_URL}/articles/tag-families`,
    getAll: `${API_BASE_URL}/articles/tag-families/getAll`,
    getById: (id) => `${API_BASE_URL}/articles/tag-families/getOne/${id}`,
    create: `${API_BASE_URL}/articles/tag-families/create`,
    update: (id) => `${API_BASE_URL}/articles/tag-families/update/${id}`,
    delete: (id) => `${API_BASE_URL}/articles/tag-families/delete/${id}`,
  },
}; 