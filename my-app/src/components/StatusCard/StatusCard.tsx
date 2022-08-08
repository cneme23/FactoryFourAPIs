import {
	Card,
	CardBody,
	Col,
	CardTitle,
	CardText,
	CardProps,
	CardHeader,
	CardSubtitle,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import HealthStatusResponse from "../../models/healthStatusResponse";
import CheckStatusApiService from "../../services/checkApiStatus.service";
import { Config } from "../../config";
import { DateUtils } from "../../utils/DateUtils";
import classnames from "classnames";
import Loader from "components/Loader/Loader";
import { AxiosResponse } from "axios";
import { BiError } from 'react-icons/bi';
import styles from "./StatusCard.module.scss";

//API data refresh time. 
const { refreshTime } = Config;

interface StatsCardProps extends CardProps {
	apiName?: string;
}

const StatusCard: React.FC<StatsCardProps> = (statsCardProps) => {
	const { apiName } = statsCardProps;
	const [healthStatusResponse, setHealthStatusResponse] =
		useState<HealthStatusResponse>();
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const fetchData = async (apiName: string, isFirstCall: boolean) => {
		try {
			const response: AxiosResponse<HealthStatusResponse> =
				await CheckStatusApiService.getStatus(apiName);
			setHealthStatusResponse(response.data);
		} catch (error: any) {

			const status = error.message === "Network Error" ? 503 : error.response.status
			const errorDisplay: HealthStatusResponse = {
				success: false,
				message: status,
				time: Number(new Date()),
			}
			setHealthStatusResponse(errorDisplay);
		} finally {
			if (isFirstCall) {
				setIsFetching(false);
			}
		}
	};


	useEffect(() => {
		if (apiName) {
			fetchData(apiName, true);
			let interval = setInterval(() => {
				fetchData(apiName, true);
			}, Number(refreshTime));

			return () => clearInterval(interval);
		}
	}, []);

	return (
		<Card
			className={classnames(
				styles.StatusCard,
				healthStatusResponse?.success ? styles.SuccessCard : styles.DangerCard
			)}

		>
			{!isFetching ? (
				<>
					<Col className="col-12">
						<CardHeader tag="h4" className="d-inline-flex border-bottom-0">
							{apiName?.toUpperCase()}
							{!healthStatusResponse?.success && <BiError className={(styles.ErrorIcon)} />}
						</CardHeader>
					</Col>
					<CardBody>
						<Col className="col-12">
							<CardTitle className="mb-2" tag={healthStatusResponse?.success ? "h5" : "h3"}>
								{!healthStatusResponse?.success && "Status: "}
								{healthStatusResponse?.message}
							</CardTitle>
						</Col>
						{healthStatusResponse?.success && (
							<Col className="col-12">
								<CardSubtitle tag={"h5"} className="mb-2">
									<b>Host: </b>
									{healthStatusResponse?.hostname}
								</CardSubtitle>
							</Col>
						)}
						{!healthStatusResponse?.success && (
							<Col className="col-12">
								<CardSubtitle tag={"h5"} className="mb-2">
									<p className={classnames(styles.BlinkText)}>ERROR</p>
								</CardSubtitle>
							</Col>
						)}
						<Col className="col-12">
							<CardText tag={"h5"}>
								<b>Time: </b>
								{DateUtils.formatToLocalTime(healthStatusResponse?.time)}
							</CardText>
						</Col>
					</CardBody>
				</>
			) : (
				<Loader />
			)}
		</Card>
	);
};

export default React.memo(StatusCard);
