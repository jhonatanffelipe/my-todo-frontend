import { IUpdatePassword } from "../../interfaces/IUpdatePassword";
import api from "../api";

const updatePassword = async ({
  accessToken,
  currentPassword,
  password,
  confirmPassword,
}: IUpdatePassword): Promise<void> => {
  await api
    .put(
      "/password/update",
      {
        currentPassword,
        password,
        confirmPassword,
      },
      {
        headers: {
          Authorization: accessToken,
        },
      },
    )
    .then(response => response)
    .catch(error => {
      throw Error(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Erro ao tentar alterar senha. Por favor tente mais tarde",
      );
    });
};

export { updatePassword };
