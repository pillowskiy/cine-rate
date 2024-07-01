import { HTTPError } from 'ky';
import { IApiReject } from '@app/types/index';

export async function rejectKy(err: unknown): Promise<IApiReject> {
  if (!(err instanceof HTTPError)) {
    return { message: 'Unhandled error occurred', status: 500 };
  }
  const { status, statusText } = err.response;
  const data = await err.response.json();
  const message = data.message || data.status_message || statusText;
  return { status, message };
}
