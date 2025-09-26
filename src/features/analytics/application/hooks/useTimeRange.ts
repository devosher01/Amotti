import { useState, useCallback, useMemo } from 'react';
import { TimeRange, DateRange } from '../../domain/types';
import moment from 'moment';

export const useTimeRange = (initialRange: TimeRange = '30d') => {
  const [timeRange, setTimeRange] = useState<TimeRange>(initialRange);
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>(null);

  const calculateDates = useCallback((range: TimeRange): DateRange => {
    const endDate = moment().format('YYYY-MM-DD');
    let startDate = moment().format('YYYY-MM-DD');

    switch (range) {
      case '7d':
        startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        break;
      case '30d':
        startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        break;
      case '90d':
        startDate = moment().subtract(90, 'days').format('YYYY-MM-DD');
        break;
      case '1y':
        startDate = moment().subtract(1, 'year').format('YYYY-MM-DD');
        break;
      case 'custom':
        if (customDateRange) {
          return customDateRange;
        }
        // Fallback to 30d if custom is selected but no dates are set
        startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        break;
    }
    return { startDate, endDate };
  }, [customDateRange]);

  const dateRange = useMemo(() => calculateDates(timeRange), [timeRange, calculateDates]);

  const handleTimeRangeChange = useCallback((newRange: TimeRange) => {
    setTimeRange(newRange);
    if (newRange !== 'custom') {
      setCustomDateRange(null);
    }
  }, []);

  const handleCustomDateRangeChange = useCallback((newDates: DateRange) => {
    setCustomDateRange(newDates);
    setTimeRange('custom');
  }, []);

  return {
    timeRange,
    dateRange,
    handleTimeRangeChange,
    handleCustomDateRangeChange,
    customDateRange,
  };
};
