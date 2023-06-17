import Result from "./Result";
import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";
import { ROOT_API } from "../Config/api.config";

// Axios.defaults.withCredentials = true;

export interface IRequestOptions {
    url: string;
    data?: any;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    isShowError?: boolean;
}

export interface ISendFormDataOptions {
    url: string;
    data: FormData;
    method: "POST" | "PUT" | "PATCH";
}

/**
 * Represents base class of the isomorphic service.
 */
export abstract class ServiceBase {

    /**
     * Make request with JSON data.
     * @param opts
     */
    public async requestJson<T>(opts: IRequestOptions): Promise<Result<T>> {

        var axiosResult = null;
        var result = null as unknown as Result<any>;

        opts.isShowError = opts.isShowError ?? true;

        // opts.url = `https://localhost:5001/${transformUrl(opts.url)}`; // Allow requests also for the Node.
        // opts.url = `${ROOT_API}/${transformUrl(opts.url)}`; // Allow requests also for the Node.
        opts.url = `${ROOT_API}/${opts.url}`; // Allow requests also for the Node.

console.log(opts);

        var processQuery = (url: string, data: any): string => {
            if (data) {
                return `${url}?${queryString.stringify(data)}`;
            }
            return url;
        };

        var axiosRequestConfig: AxiosRequestConfig;

        axiosRequestConfig = {
            withCredentials: true
        }

console.log(opts);


        // console.log('requestJson', opts);

        try {
            switch (opts.method) {
                case "GET":
                    axiosResult = await Axios.get(processQuery(opts.url, opts.data), axiosRequestConfig);
                    break;
                case "POST":
                    axiosResult = await Axios.post(opts.url, opts.data, axiosRequestConfig);
                    break;
                case "PUT":
                    axiosResult = await Axios.put(opts.url, opts.data, axiosRequestConfig);
                    break;
                case "PATCH":
                    axiosResult = await Axios.patch(opts.url, opts.data, axiosRequestConfig);
                    break;
                case "DELETE":
                    axiosResult = await Axios.delete(processQuery(opts.url, opts.data), axiosRequestConfig);
                    break;
            }
            if(axiosResult)
            {
              console.log(axiosResult);
                const responseResult = axiosResult as AxiosResponse<any>;
                result = new Result(responseResult.data.succeeded, responseResult.data.failed, responseResult.data.message, responseResult.data.data);
            }

            // console.log('requestJson result', result);

        } catch (error) {
            result = this.handleApiException(error);

            // console.log('requestJson error', error);

            // result = new Result(null, error.message);
        }

        if (result.hasErrors && opts.isShowError) {
            // showErrors(...result.errors);
        }

        return result;
    }

    private handleApiException(error) {
        if (error != null && error.response != null && error.response.data != null && error.response.data.Message != null) {
            return new Result(false, true, error.response.data.Message, null, error.response.data.Message);
        }

        return new Result(false, true, error.message, null, error.message);
    }

   
}