// Response status interface
export interface IStatus {
  message: string;
  status: boolean;
  status_code: number;
};

// API response interface
export interface IResponse {
  status: IStatus;
  data: Object | any;
};
