import TokenService from '../../services/token.service'
import AccountService from "../../services/AccountService";
import { LoginModel } from '../../models/LoginModel';

export default function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.interceptors.request.use(
    (config: any) => {
      const accessToken = TokenService.getLocalAccessToken();
      // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwianRpIjoiZTdmN2VmODUtM2Y5Ni00YmQ3LTk3ZmUtMmVlMTc0MjU1YWVmIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInVpZCI6ImJlMzllYzQzLTRjMTEtNDdkYS05NWE5LTJkZTBlYWNlNGRlYiIsImZpcnN0X25hbWUiOiJNdWtlc2giLCJsYXN0X25hbWUiOiJNdXJ1Z2FuIiwiZnVsbF9uYW1lIjoiTXVrZXNoIE11cnVnYW4iLCJpcCI6IjAuMC4wLjEiLCJyb2xlcyI6WyJBZG1pbiIsIk1vZGVyYXRvciIsIlN1cGVyQWRtaW4iLCJCYXNpYyJdLCJuYmYiOjE2ODY5NzgwODUsImV4cCI6MTY4Njk4MTY4NSwiaXNzIjoiQXNwTmV0Q29yZUhlcm8uQm9pbGVycGxhdGUuQXBpIiwiYXVkIjoiQXNwTmV0Q29yZUhlcm8uQm9pbGVycGxhdGUuQXBpLlVzZXIifQ.ClHIOWg55nlTC9omnv3gQNmN1hGcs1Lr-a0KZiqX9xM';
      if (accessToken) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res: any) => {
      return res;
    },
    async (err: any) => {

      console.log('axios.interceptors.response err', err);

      const originalConfig = err.config;
 
      if (originalConfig.url !== "/auth" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const service = new AccountService();
            const login: LoginModel = {email: 'superadmin@gmail.com', password: '123Pa$$word!'};
            await service.getToken(login);
            
            return axios(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
}


