export interface IErrorResponse {
  error: boolean;
  message: string;
  status: number;
}

export interface IAction {
  type: any;
  payload?: any;
  message?: string;
}
