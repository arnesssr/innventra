export const getISOString = () => new Date().toISOString();
export const generateId = () => Date.now().toString();
export const getCurrentTimestamp = () => ({
  id: generateId(),
  timestamp: getISOString()
});
