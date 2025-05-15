export interface ApiPageResponse<T> {
    content: T;
    totalElements: number;
    page: number;
    size: number;
    totalPages: number;
    last: boolean
  }
  