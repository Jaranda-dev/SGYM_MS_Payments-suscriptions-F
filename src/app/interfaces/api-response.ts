export interface ApiResponse<T> {
  status: 'success' | 'error'
  data: T
  msg: string
}
