import { useEffect, useMemo } from "react";
import { useUsers } from "../../hooks/use.users";
import { UsersApiRepo } from "../../repo/user.api.repo";
import { RegisterLogin } from "../register.login/register.login";

export default function Home() {
  const repo = useMemo(() => new UsersApiRepo(), []);

  const { users, loadUsers } = useUsers(repo);

  useEffect(() => {
    loadUsers();
  });

  return (
    <main>
      <RegisterLogin></RegisterLogin>

      <section className="home">
        {users.map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.name}</h2>
            </div>
          );
        })}
      </section>
    </main>
  );
}
