"use client";
import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';

const FilterBar = ({ filterType, setFilterType }) => {
  const handleChange = (e, val) => {
    if (val !== null) setFilterType(val);
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="subtitle2">Filter by Type:</Typography>
      <ToggleButtonGroup
        color="primary"
        value={filterType}
        exclusive
        onChange={handleChange}
        size="small"
      >
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="Placement">Placement</ToggleButton>
        <ToggleButton value="Result">Result</ToggleButton>
        <ToggleButton value="Event">Event</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default FilterBar;
