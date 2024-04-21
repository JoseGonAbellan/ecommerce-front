import React, { ReactNode } from 'react';
import styles from './contentContainer.module.css';

interface Props {
    children: ReactNode;
}

const ContentContainer: React.FC<Props> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default ContentContainer;
