import React from "react";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
	return (
		<div className={styles.divLoader}>
			<span className="spinner-border spinner-border-sm"></span>
			Loading...
		</div>
	);
};

export default React.memo(Loader);
