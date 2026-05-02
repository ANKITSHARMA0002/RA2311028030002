"use client";
import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import NotificationCard from './NotificationCard';

const NotificationList = ({ notifications, title, isPriority, seenIds, markAsSeen, loading }) => {
  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary" p={2} sx={{ textAlign: 'center', border: '1px dashed #ccc', borderRadius: 1 }}>
          No notifications found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>{title} ({notifications.length})</Typography>
      {notifications.map((notif, index) => {
        const id = notif.id || notif._id || `fallback-${index}`;
        const isSeen = seenIds.includes(id);
        
        return (
          <NotificationCard 
            key={id}
            data={notif}
            isSeen={isSeen}
            isPriority={isPriority}
            onHover={markAsSeen}
          />
        );
      })}
    </Box>
  );
};

export default NotificationList;
