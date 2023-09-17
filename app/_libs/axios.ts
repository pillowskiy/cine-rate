import { isAxiosError } from "axios";

export function rejectAxios(err: unknown) {
    if (isAxiosError(err) && err.response) {
        return err.response.data;
    }
    throw err;
}