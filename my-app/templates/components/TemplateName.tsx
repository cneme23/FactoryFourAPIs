import React from 'react';
import styles from './TemplateName.module.scss';

const TemplateName: React.FC = () => {
  return (
    <>
      <div className={styles.TemplateName} data-testid="TemplateName">
        TemplateName Component
      </div>
    </>
  );
};

export default React.memo(TemplateName);