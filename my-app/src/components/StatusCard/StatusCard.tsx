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
import styles from "./StatusCard.module.scss";
import HealthStatusResponse from "../../models/healthStatusResponse";
import CheckStatusApiService from "../../services/checkApiStatus.service";
import { Config } from "../../config";
import { DateUtils } from "../../utils/DateUtils";
import classnames from "classnames";

import Loader from "components/Loader/Loader";
import { AxiosResponse } from "axios";

const { refreshTime } = Config;

interface StatsCardProps extends CardProps {
	apiName?: string;
}

const StatusCard: React.FC<StatsCardProps> = (statsCardProps) => {
	const { apiName, ...res } = statsCardProps;

	const [healthStatusResponse, setHealthStatusResponse] =
		useState<HealthStatusResponse>();

	const [isFetching, setIsFetching] = useState<boolean>(false);
	const successMessage = healthStatusResponse?.success;

	const fetchData = async (apiName: string) => {
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
			setIsFetching(false);
		}
	};

	const initProcess = async (apiName: string) => {
		fetchData(apiName);
	};

	useEffect(() => {
		if (apiName) {
			setIsFetching(true);

			initProcess(apiName);
			let interval = setInterval(() => {
				initProcess(apiName);
			}, Number(refreshTime));

			return () => clearInterval(interval);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card
			className={classnames(
				styles.StatusCard,
				successMessage ? styles.SuccessCard : styles.DangerCard
			)}
			{...res}
		>
			{!isFetching ? (
				<>
					<Col className="col-12">
						<CardHeader tag="h4" className="d-inline-flex border-bottom-0">
							{apiName?.toUpperCase()}
						</CardHeader>
					</Col>
					<CardBody>
						<Col className="col-12">
							<CardTitle className="mb-2" tag={successMessage ? "h5" : "h3"}>
								{!successMessage && "Status: "}
								{healthStatusResponse?.message}
							</CardTitle>
						</Col>
						{successMessage && (
							<Col className="col-12">
								<CardSubtitle tag={"h5"} className="mb-2">
									<b>Host: </b>
									{healthStatusResponse?.hostname}
								</CardSubtitle>
							</Col>
						)}
						{!successMessage && (
							<Col className="col-12">
								<CardSubtitle tag={"h5"} className="mb-2">
									ERROR
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
