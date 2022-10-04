import axios from "axios";
import { SERVER_URL } from "../../config";

/**
 * @param email
 * @return { status, message }
 * */
export const forgotPasswordAPI = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .post(SERVER_URL + "/auth/forgot", { email: email })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @param email
 * @return { res }
 * */
export const resetPasswordAPI = (email, code, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(SERVER_URL + "/auth/reset", { verifyCode: code, password: password, email: email })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
