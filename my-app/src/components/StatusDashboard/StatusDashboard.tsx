import React from "react";
import apiNames from "../../data/apiNames.json";
import { Card, CardHeader, Col, Row } from "reactstrap";
import StatusCard from "components/StatusCard/StatusCard";
import styles from "./StatusDashboard.module.scss";
import classNames from "classnames";

//This component its encharged of renderizing each single card.
const statusDashboard: React.FC = () => {
	return (
		<Card className={classNames(styles.statusDashboard, "border-0 p-0")}>
			<CardHeader
				className={classNames(styles.statusHeaderDashboard)}
				tag={"h2"}
			>
				Status Dashboard
			</CardHeader>

			<Col className="mt-5">
				<Row className="d-flex m-0">
					{apiNames.map((apiName, index): any => 
						 (
							<Col key={index}
								className={classNames(
									styles.statusDashboard,
									"p-3 col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 justify-content-center d-flex custom-grid"
								)}
							>
								<StatusCard apiName={apiName} />
							</Col>
						)
					)}
				</Row>
			</Col>
		</Card>
	);
};

export default React.memo(statusDashboard);
