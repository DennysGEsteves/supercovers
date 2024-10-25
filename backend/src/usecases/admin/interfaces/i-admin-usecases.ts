export abstract class IAdminUseCases {
  abstract validateLoginCredentials(
    email: string,
    password: string,
  ): Promise<string>;
}
