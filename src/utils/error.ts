import { GraphQLError } from 'graphql';

export class AppError extends Error {
  public static Unauthorized = { code: 1001, msg: 'Unauthorized' };
  public static USER_NOT_FOUND = { code: 1002, msg: 'User not found' };
  public static INVALID_PASSWORD = { code: 1003, msg: 'Invalid password' };
  public static EMAIL_IS_REQUIRED = { code: 1004, msg: 'Email is required' };
  public static PASSWORD_IS_REQUIRED = { code: 1005, msg: 'Password is required' };
  public static EMAIL_ALREADY_EXISTS = { code: 1006, msg: 'Email already exists' };
  public static SERVER_INTERNAL_ERROR = { code: 9999, msg: 'Server internal error' };

  public code: number;
  constructor(opts) {
    super(opts.msg);
    this.code = opts.code;
  }
}

export function formatError(error: GraphQLError) {
  if (error.originalError instanceof AppError) {
    const { code, message } = error.originalError;
    return { code, message };
  }
  console.log(error);
  return error;
}
