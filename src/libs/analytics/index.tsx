import React, { useEffect } from 'react';
import AnalyticsFunction from './AnalyticsService';

const AnalyticsWatcher = () => {
    useEffect(() => {
        AnalyticsFunction.init();
        AnalyticsFunction.functionAppOpen();
    }, []);
    return <></>;
};
export default AnalyticsWatcher;
