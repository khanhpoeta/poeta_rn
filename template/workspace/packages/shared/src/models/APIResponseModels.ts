export interface DataListResponse<TData> {
  total: number;
  data: TData;
}

export interface DataResponse<TData> {
  code: number;
  data: TData;
  message: string;
}

export interface APIResponse<DataType> {
  data?: DataType;
  error?: string;
  code: number;
}
