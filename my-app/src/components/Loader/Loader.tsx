import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.divLoader} data-testid="Loader">
      <Spinner animation="border" role="status" variant="primary">
        <span className="sr-only">loading..</span>
      </Spinner>
    </div>
  );
};

export default React.memo(Loader);
