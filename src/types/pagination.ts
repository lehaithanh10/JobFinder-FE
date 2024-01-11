export interface IPagination {
  page: number;
  pageSize: number;
  offset: number;
  limit: number;
  total?: number;
}
