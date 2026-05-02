"use client";

import React, { useEffect } from 'react';
import { Container, Typography, Box, Alert, Button, Divider, Paper } from '@mui/material';
import NotificationList from '../components/NotificationList';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { useNotifications } from '../hooks/useNotifications';
import { Log } from '../services/logging';

export default function Home() {
  const {
    notifications,
    priorityNotifications,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    filterType,
    setFilterType,
    seenIds,
    markAsSeen,
    markAllAsSeen,
    refresh
  } = useNotifications();

  useEffect(() => {
    Log("frontend", "info", "page", "Home page mounted");
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Campus Notifications
        </Typography>
        <Button variant="outlined" onClick={markAllAsSeen}>
          Mark all as seen
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} action={
          <Button color="inherit" size="small" onClick={refresh}>Retry</Button>
        }>
          {error}
        </Alert>
      )}

      <Paper elevation={0} variant="outlined" sx={{ p: 3, mb: 4, bgcolor: '#fafafa' }}>
        <NotificationList 
          title="Priority Notifications" 
          notifications={priorityNotifications} 
          isPriority={true}
          seenIds={seenIds}
          markAsSeen={markAsSeen}
          loading={loading}
        />
      </Paper>
      
      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          All Notifications
        </Typography>
        <FilterBar filterType={filterType} setFilterType={setFilterType} />
      </Box>

      <NotificationList 
        title="Recent Notifications" 
        notifications={notifications} 
        isPriority={false}
        seenIds={seenIds}
        markAsSeen={markAsSeen}
        loading={loading}
      />

      <Pagination 
        page={page} 
        setPage={setPage} 
        limit={limit} 
        setLimit={setLimit}
        disabled={loading}
      />
    </Container>
  );
}
