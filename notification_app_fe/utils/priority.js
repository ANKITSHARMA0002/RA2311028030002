export const calculatePriorityScore = (item) => {
  let weight = 0;
  const type = item.notification_type || item.type;
  
  if (type === "Placement") weight = 3;
  else if (type === "Result") weight = 2;
  else if (type === "Event") weight = 1;

  let ts = Date.now();
  if (item.timestamp) {
    ts = typeof item.timestamp === 'number' ? item.timestamp : new Date(item.timestamp).getTime();
  }
  
  return weight * 1000000000 + ts;
};

export const getPriorityNotifications = (data, count = 10) => {
  if (!Array.isArray(data)) return [];
  
  let mapped = data.map(item => ({
    ...item,
    score: calculatePriorityScore(item)
  }));
  
  mapped.sort((a, b) => b.score - a.score);
  return mapped.slice(0, count);
};
