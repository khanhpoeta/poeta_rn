/* eslint-disable @typescript-eslint/no-namespace */
export namespace Constant {
  const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const phone = /^[0-9]{10}$/;

  export const Regex = {
    passwordPattern: password,
    phonePattern: phone,
  };
}
