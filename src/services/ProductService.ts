import Result from "../core/Result";
import { LoginModel } from "../models/LoginModel";
import { ServiceBase } from "../core/ServiceBase";
import { API_PRODUCT_GET } from "../Config/api.config";
import { AxiosResponse } from "axios";
import TokenService from '../services/token.service'

export default class ProductService extends ServiceBase {

    public async getProducts() {
        var result = await this.requestJson<string>({
            url: API_PRODUCT_GET,
            method: "GET",
            data: null
        });

        if (!result.hasErrors) {
            return result.value;
        }
    }

}
