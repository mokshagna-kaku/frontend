// Define storage keys
export const STORAGE_KEYS = { 
  LINKS: 'shortlinks_v1',
  LOGS: 'app_logs_v1'
};

// Get saved links from localStorage
export const getLinks = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LINKS) || '[]');
  } catch (e) {
    return [];
  }
};

// Save links to localStorage
export const saveLinks = (links) => {
  localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
};

// Get logs from localStorage
export const getLogs = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');
  } catch (e) {
    return [];
  }
};
