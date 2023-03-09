import { useEffect, useMemo } from "react";
import { useUsers } from "../../hooks/use.users";
import { UsersApiRepo } from "../../repo/user.api.repo";
import { RegisterLogin } from "../register.login/register.login";

export default function Home() {
  const repo = useMemo(() => new UsersApiRepo(), []);

  const { users, readAll } = useUsers(repo);

  useEffect(() => {
    readAll("");
  });

  return (
    <main>
      <RegisterLogin></RegisterLogin>

      <section className="home">
        {users.map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.username}</h2>
            </div>
          );
        })}
      </section>
    </main>
  );
}
