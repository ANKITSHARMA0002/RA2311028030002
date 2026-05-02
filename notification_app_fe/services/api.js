import { Log } from "./logging";

export const fetchNotificationsAPI = async (limit, page, type, token) => {
  Log("frontend", "info", "api", "Fetching notifications");
  
  try {
    let url = `http://20.207.122.201/evaluation-service/notifications?limit=${limit}&page=${page}`;
    
    if (type && type !== "All") {
      url += `&notification_type=${type}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      Log("frontend", "error", "api", "Failed to fetch notifications");
      throw new Error("API request failed");
    }

    const result = await res.json();
    Log("frontend", "info", "api", "Successfully fetched notifications");
    return result;
  } catch (err) {
    Log("frontend", "error", "api", err.message || "Error fetching notifications");
    throw err;
  }
};
