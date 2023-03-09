import { ServerResp, User } from "../models/user.model";

interface UsersApiRepoStructure {
  readAll(token: string): Promise<ServerResp>;
  readOne(id: User["id"], token: string): Promise<ServerResp>;
  createUser(newUser: User): Promise<User>;
  logUser(info: Partial<User>): Promise<void>;
  update(
    userInfo: Partial<User>,
    action: string,
    token: string
  ): Promise<ServerResp>;
}

export class UsersApiRepo implements UsersApiRepoStructure {
  url: string;
  constructor() {
    this.url = "http://localhost:4200/users";
  }
  async readAll(token: string): Promise<ServerResp> {
    const resp = await fetch(this.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) throw new Error("HTTP Error");
    const data = await resp.json();
    return data;
  }

  async readOne(id: User["id"], token: string): Promise<ServerResp> {
    const url = this.url + "/" + id;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer" + token,
      },
    });
    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const users = (await resp.json()) as ServerResp;
    return users;
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
  async update(
    userInfo: Partial<User>,
    action: string,
    token: string
  ): Promise<ServerResp> {
    const url = this.url + "/" + action;
    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(userInfo),
      headers: {
        Authorization: "Bearer" + token,
      },
    });
    if (!resp.ok)
      throw new Error("Error http: " + resp.status + ". " + resp.statusText);
    const userData = (await resp.json()) as ServerResp;
    return userData;
  }
}
