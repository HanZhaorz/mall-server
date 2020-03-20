export interface CurlResponse<T> {
  status: number;
  data: T;
}
