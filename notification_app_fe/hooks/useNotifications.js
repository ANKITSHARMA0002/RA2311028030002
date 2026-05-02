"use client";
import { useState, useEffect } from 'react';
import { fetchNotificationsAPI } from '../services/api';
import { getPriorityNotifications } from '../utils/priority';
import { Log } from '../services/logging';

export const useNotifications = (initialLimit = 10) => {
  const [notifications, setNotifications] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [filterType, setFilterType] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seenIds, setSeenIds] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('seen_notifications');
      if (saved) setSeenIds(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (seenIds.length > 0) {
      localStorage.setItem('seen_notifications', JSON.stringify(seenIds));
    }
  }, [seenIds]);

  const markAsSeen = (id) => {
    if (!seenIds.includes(id)) {
      Log("frontend", "info", "state", `Marking notification ${id} as seen`);
      setSeenIds(prev => [...prev, id]);
    }
  };

  const markAllAsSeen = () => {
    Log("frontend", "info", "state", "Marking all notifications as seen");
    const ids = notifications.map(n => n.id || n._id);
    setSeenIds([...new Set([...seenIds, ...ids])]);
  };

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      Log("frontend", "info", "hook", "Starting notification fetch");
      const res = await fetchNotificationsAPI(limit, page, filterType, "dummy_token");
      
      let list = [];
      if (Array.isArray(res)) list = res;
      else if (res && Array.isArray(res.notifications)) list = res.notifications;
      else if (res && Array.isArray(res.data)) list = res.data;

      setNotifications(list);
      setPriorityData(getPriorityNotifications(list, 10));
      Log("frontend", "info", "hook", "Notification state updated");
    } catch (err) {
      Log("frontend", "error", "hook", "Failed to fetch notifications, using fallback");
      setError(err.message + " (CORS blocked). Using mock data for demonstration.");
      
      const mock = [
        { id: 1, notification_type: 'Placement', message: 'Google is hiring for SDE roles!', timestamp: Date.now() },
        { id: 2, notification_type: 'Result', message: 'Semester 6 final results declared.', timestamp: Date.now() - 86400000 },
        { id: 3, notification_type: 'Event', message: 'Annual Campus Tech Fest starts tomorrow.', timestamp: Date.now() - 172800000 },
        { id: 4, notification_type: 'Placement', message: 'Amazon internship applications open.', timestamp: Date.now() - 259200000 },
        { id: 5, notification_type: 'Result', message: 'Re-evaluation portal is now live.', timestamp: Date.now() - 345600000 }
      ];
      
      const filtered = filterType === 'All' ? mock : mock.filter(n => n.notification_type === filterType);
      setNotifications(filtered);
      setPriorityData(getPriorityNotifications(filtered, 10));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page, limit, filterType]);

  return {
    notifications,
    priorityNotifications: priorityData,
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
    refresh: fetchItems
  };
};
