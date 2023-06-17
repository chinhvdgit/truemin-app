import Result from "../core/Result";
import { LoginModel } from "../models/LoginModel";
import { ServiceBase } from "../core/ServiceBase";
import { API_IDENTITY_GET_TOKEN } from "../Config/api.config";
import { AxiosResponse } from "axios";
import TokenService from '../services/token.service'

export default class AccountService extends ServiceBase {

    public async getToken(loginModel: LoginModel) {
        var result = await this.requestJson<string>({
            url: API_IDENTITY_GET_TOKEN,
            method: "POST",
            data: loginModel
        });

        console.log(result);
        if (!result.hasErrors) {
            TokenService.updateLocalAccessToken(result.value.jwToken);
        }
    }

}
