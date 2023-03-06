export type User = {
  email: string;
  passwd: string;
  name: string;
  friends: User[];
  enemies: User[];
};
