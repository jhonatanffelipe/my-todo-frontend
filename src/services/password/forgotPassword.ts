import { IForgotPassword } from "../../interfaces/IForgotPassword";
import { AppError } from "../../utils/errors/AppError";
import api from "../api";

const forgotPassword = async ({ email }: IForgotPassword): Promise<void> => {
  await api
    .post("password/forgot", { email })
    .then()
    .catch(() => {
      throw new AppError("Ocorreu um erro ao requisitar recuperação de senha.");
    });
};

export { forgotPassword };
