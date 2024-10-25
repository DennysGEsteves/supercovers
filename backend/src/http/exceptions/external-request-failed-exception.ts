export class ExternalRequestFailed extends Error {
  public readonly externalMessage: string;

  public readonly method: string;

  public readonly externalUrl: string;

  public readonly statusCode: string;

  public readonly responseData: string | Record<string, any>;

  constructor(
    message: string,
    method: string,
    externalUrl: string,
    statusCode: string,
    responseData: Record<string, any>,
  ) {
    super(`External request failed with message: ${message}`);
    this.externalMessage = message;
    this.method = method;
    this.externalUrl = externalUrl;
    this.statusCode = statusCode;
    this.responseData = responseData;
  }
}
