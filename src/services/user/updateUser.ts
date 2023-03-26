import { IUpdateUser } from "../../interfaces/IUpdateUser";
import api from "../api";

const updateUser = async ({ name, email, currentPassword, password, confirmPassword }: IUpdateUser): Promise<void> => {
  await api
    .put("/users", {
      name,
      email,
      currentPassword,
      password,
      confirmPassword,
    })
    .then(response => response)
    .catch(error => {
      throw Error(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Erro ao tentar criar usuário. Por favor tente mais tarde",
      );
    });
};

export { updateUser };
