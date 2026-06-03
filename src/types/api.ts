// export interface Pagination {
//   page: number;
//   pageSize: number;
//   total: number;
//   totalPages: number;
// }

// export interface ApiListResponse<T> {
//   success: boolean;
//   data: T[];
//   pagination: Pagination;
// }

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}