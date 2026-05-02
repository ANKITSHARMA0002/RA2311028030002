"use client";
import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

const NotificationCard = ({ data, isSeen, onHover, isPriority }) => {
  const type = data.notification_type || data.type || "Event";
  const id = data.id || data._id;
  
  const getBadgeColor = (type) => {
    if (type === 'Placement') return 'success';
    if (type === 'Result') return 'info';
    return 'secondary';
  };

  return (
    <Card 
      variant="outlined" 
      onMouseEnter={() => onHover && onHover(id)}
      sx={{ 
        mb: 2, 
        position: 'relative',
        backgroundColor: isSeen ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
        borderLeft: isSeen ? '1px solid #e0e0e0' : '4px solid #1976d2',
        transition: 'all 0.2s ease-in-out',
        '&:hover': { boxShadow: 2 }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip size="small" label={type} color={getBadgeColor(type)} />
            {isPriority && <Chip size="small" label="Priority" color="error" variant="outlined" />}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {new Date(data.timestamp || Date.now()).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1">
          {data.message || data.content || "No message provided"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
