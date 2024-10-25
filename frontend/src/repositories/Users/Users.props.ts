export type UserUpdateProps = {
  name: string;
  slug: string;
};

export type UserCreateProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
