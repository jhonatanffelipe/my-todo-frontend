import { ICreateUser } from "../../interfaces/ICreateUser";
import api from "../api";

const createUser = async ({ name, email, password, confirmPassword }: ICreateUser): Promise<void> => {
  await api
    .post("/users", {
      name,
      email,
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

export { createUser };
