import axios, { AxiosResponse } from "axios";
import HealthStatusResponse from "models/healthStatusResponse";
import { Config } from "../config";
const {
	API: { apiRootPath, apiSuffixPath },
} = Config;

class CheckStatusApiService {
	getStatus = (apiName: string): Promise<AxiosResponse<HealthStatusResponse>> =>
		axios.get<HealthStatusResponse>(
			`${apiRootPath}/${apiName}/${apiSuffixPath}`
		);

		}

export default new CheckStatusApiService();
