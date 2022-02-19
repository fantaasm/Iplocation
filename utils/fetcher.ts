import {Fetcher} from "swr";
import {IpResponse} from "../pages/api/locate/[ip]";

export const fetcher: Fetcher<IpResponse> = (...args: any[]) => fetch(...args).then(res => res.json())