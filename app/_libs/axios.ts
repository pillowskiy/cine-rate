import { isAxiosError } from "axios";
import type { IApiReject } from "@app/types/index";

export function rejectAxios(err: unknown): IApiReject {
    if (isAxiosError(err) && err.response) {
        const { data, status } = err.response;
        return { message: data.message, status };
    }
    throw err;
}