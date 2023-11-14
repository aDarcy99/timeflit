export type TApiResponse<Type> = {
  status: 'success' | 'error';
  data?: Type;
  message?: string;
};
