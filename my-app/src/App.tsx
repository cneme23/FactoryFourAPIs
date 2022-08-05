import StatusDashboard from "components/StatusDashboard/StatusDashboard";
import styles from "scss/App.module.scss";
import React from "react";

function App() {
	return (
		<div className={styles.App}>
			<StatusDashboard />
		</div>
	);
}

export default App;
