export interface Login {
  email: string;
  password: string;
};

export interface Register {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
