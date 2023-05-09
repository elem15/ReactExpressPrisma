import { ErrorMessage } from '../types';

export const isErrorWithMessage = (error: unknown): error is ErrorMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as Record<string, unknown>).data === 'object'
  );
};
export function handleErrors<A extends any[]>(
  p: (...args: A) => Promise<void>
): (...args: A) => void {
  return (...args: A) => {
    try {
      p(...args).catch((err) =>
        console.log('Error thrown asynchronously', err)
      );
    } catch (err) {
      console.log('Error thrown synchronously', err);
    }
  };
}
