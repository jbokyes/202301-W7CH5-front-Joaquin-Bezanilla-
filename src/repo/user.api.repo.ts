import { User } from "../models/user.model";

interface UsersApiRepoStructure {
  loadUsers(token: string): Promise<User[]>;
  createUser(newUser: User): Promise<User>;
}

export class UsersApiRepo implements UsersApiRepoStructure {
  url: string;
  constructor() {
    this.url = "http://localhost:4200/users";
  }
  async loadUsers(token: string): Promise<User[]> {
    const resp = await fetch(this.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) throw new Error("HTTP Error");
    const data = await resp.json();
    return data;
  }
  async createUser(newUser: User): Promise<User> {
    const create = `${this.url}/register`;
    const resp = await fetch(create, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok) throw new Error("HTTP Error");
    const data = await resp.json();
    return data;
  }
  async logUser(info: Partial<User>): Promise<void> {
    const log = `${this.url}/login`;
    const resp = await fetch(log, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-type": "application/json",
      },
    });
    resp.json().then((data) => {
      localStorage.setItem("Token", data.results.token);
    });
  }
}
