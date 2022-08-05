import axios, { AxiosResponse } from "axios";
import HealthStatusResponse from "models/healthStatusResponse";
import { Config } from "../config";
const {
	API: { apiRootPath, apiSuffixPath, apiRootPathNoCors },
} = Config;

class CheckStatusApiService {
	getStatus = (apiName: string): Promise<AxiosResponse<HealthStatusResponse>> =>
		axios.get<HealthStatusResponse>(
			`${apiRootPath}/${apiName}/${apiSuffixPath}`
		);

	getStatusWithCorsByPass = (
		apiName: string
	): Promise<AxiosResponse<HealthStatusResponse>> =>
		axios.get<HealthStatusResponse>(
			`${apiRootPathNoCors}/${apiName}/${apiSuffixPath}`
		);
}

export default new CheckStatusApiService();
