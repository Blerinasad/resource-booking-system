export const normalizeListResponse = (response, key) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.[key])) return response[key];
  if (Array.isArray(response?.data?.[key])) return response.data[key];
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

export const normalizePagination = (response, fallbackLength = 0, fallbackLimit = 10) => {
  const pagination = response?.pagination || response?.data?.pagination;

  if (pagination) {
    return {
      total: Number(pagination.total) || fallbackLength,
      page: Number(pagination.page) || 1,
      limit: Number(pagination.limit) || fallbackLimit,
      totalPages: Number(pagination.totalPages) || 1,
    };
  }

  return {
    total: fallbackLength,
    page: 1,
    limit: fallbackLimit,
    totalPages: Math.max(1, Math.ceil(fallbackLength / fallbackLimit)),
  };
};

export const normalizeCountValue = (item, aliases, fallback = 0) => {
  for (const key of aliases) {
    if (item?.[key] !== undefined && item?.[key] !== null) {
      return Number(item[key]) || fallback;
    }
  }
  return fallback;
};