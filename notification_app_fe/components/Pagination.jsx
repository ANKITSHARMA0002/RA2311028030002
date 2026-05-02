"use client";
import React from 'react';
import { Box, Pagination as MuiPagination, FormControl, Select, MenuItem, Typography } from '@mui/material';

const Pagination = ({ page, setPage, limit, setLimit, disabled }) => {
  const onPageChange = (e, val) => setPage(val);

  const onLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2">Items per page:</Typography>
        <FormControl size="small" disabled={disabled}>
          <Select value={limit} onChange={onLimitChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <MuiPagination 
        count={10} 
        page={page} 
        onChange={onPageChange} 
        color="primary" 
        disabled={disabled}
      />
    </Box>
  );
};

export default Pagination;
