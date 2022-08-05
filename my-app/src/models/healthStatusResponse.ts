export default interface HealthStatusResponse {
	success: boolean;
	message: string;
	hostname?: string;
	time: number;
}
