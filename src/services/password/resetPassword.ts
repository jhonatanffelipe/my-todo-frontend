import { IResetPassword } from "../../interfaces/IResetPassword";
import api from "../api";

const resetPassword = async ({ token, password, confirmPassword }: IResetPassword): Promise<void> => {
  await api
    .put("/password/reset", {
      token,
      password,
      confirmPassword,
    })
    .then(response => response)
    .catch(error => {
      throw Error(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Erro ao tentar alterar senha. Por favor tente mais tarde",
      );
    });
};

export { resetPassword };
