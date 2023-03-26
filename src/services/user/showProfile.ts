import { IProfile } from "./../../interfaces/IProfile";
import api from "../api";

const showProfile = async (): Promise<IProfile> => {
  const user = await api
    .get("/users/profile")
    .then(response => {
      const user: IProfile = {
        email: response.data.email,
        name: response.data.name,
        avatar_url: response.data.avatar_url,
        id: response.data.id,
        isAdmin: response.data.isAdmin,
      };
      return user;
    })
    .catch(error => {
      throw Error(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Erro ao listar dados do usuário. Por favor tente mais tarde",
      );
    });

  return user;
};

export { showProfile };
