export type User = {
  id: string;
  email: string;
  passwd: string;
  username: string;
  friends: User[];
  enemies: User[];
  token?: string;
  picture?: string;
};

export type FirebaseUser = {
  userName: string;
  password?: string;
  email: string;
  picture: string;
};

export type ServerResp = {
  results: User[];
};
