import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { TimeRange } from '../../domain/types';

interface TimeRangeSelectorProps {
  currentTimeRange: TimeRange;
  onTimeRangeChange: (newRange: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  currentTimeRange,
  onTimeRangeChange,
}) => {
  const handleChange = (event: SelectChangeEvent<TimeRange>) => {
    onTimeRangeChange(event.target.value as TimeRange);
  };

  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="time-range-select-label">Rango de Tiempo</InputLabel>
      <Select
        labelId="time-range-select-label"
        id="time-range-select"
        value={currentTimeRange}
        onChange={handleChange}
        label="Rango de Tiempo"
      >
        <MenuItem value="7d">Últimos 7 días</MenuItem>
        <MenuItem value="30d">Últimos 30 días</MenuItem>
        {/* <MenuItem value="custom">Personalizado</MenuItem> */}
      </Select>
    </FormControl>
  );
};

export default TimeRangeSelector;
