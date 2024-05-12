export class CustomError extends Error {
  statusCode: number;
  data?: any[];
  constructor(message: string, code: number, errData?: any[]) {
    super(message);
    this.statusCode = code;
    this.data = errData;
  }
}
