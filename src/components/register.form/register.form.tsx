import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/use.register";
import { useUsers } from "../../hooks/use.users";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../services/firebase/firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { SyntheticEvent, useMemo } from "react";
import { UsersApiRepo } from "../../repo/user.api.repo";
import { User } from "../../models/user.model";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
let pictureName: string = "picture.png";
let urlUserPicture: string = "";

export function RegisterForm() {
  const repo = useMemo(() => new UsersApiRepo(), []);
  const { createUser } = useUsers(repo);
  const navigate = useNavigate();
  const { handleChange, inputs } = useRegister();
  const handleSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formNewUser = ev.currentTarget;
    const fileUserPicture = (formNewUser[3] as HTMLInputElement).files?.item(0);
    if (fileUserPicture) {
      pictureName = `${(formNewUser[0] as HTMLFormElement).value}.png`;
      const storageRef = ref(storage, pictureName);
      await uploadBytes(storageRef, fileUserPicture);
      urlUserPicture = await getDownloadURL(storageRef);
      pictureName = "";
    }
    const newUser: Partial<User> = {
      username: (formNewUser[0] as HTMLFormElement).value,
      email: (formNewUser[1] as HTMLFormElement).value,
      passwd: (formNewUser[2] as HTMLFormElement).value,
      picture: urlUserPicture,
    };
    createUser(newUser as User);
    urlUserPicture = "";
    formNewUser.reset();
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} action=".">
        <fieldset>
          <label>Name</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            id="username"
          ></input>

          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            id="email"
          ></input>

          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={handleChange}
            id="password"
          ></input>
          <br />
          <label>Img</label>
          <input type="file" name="picture" id="files"></input>
          <input type="submit" value="Register" />
          <button onClick={() => navigate("/")}>Back Home</button>
        </fieldset>
      </form>
    </div>
  );
}
