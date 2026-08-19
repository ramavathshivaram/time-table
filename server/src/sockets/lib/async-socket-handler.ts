import logger from "#configs/logger.js";

export interface SocketResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export type SocketCallback<T = unknown> = (response: SocketResponse<T>) => void;

export type SocketHandler<TPayload, TResult = unknown> = (
  payload: TPayload,
  callback: SocketCallback<TResult>,
) => Promise<void>;

export const asyncSocketHandler = <TPayload, TResult = unknown>(
  event: string,
  handler: SocketHandler<TPayload, TResult>,
) => {
  return async (payload: TPayload, callback: SocketCallback<TResult>) => {
    try {
      logger.info(`${event}`);

      await handler(payload, callback);
    } catch (error) {
      logger.error(`${event} | error=${error}`);

      callback?.({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  };
};
