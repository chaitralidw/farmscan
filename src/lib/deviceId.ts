/**
 * Gets the persistent device ID from localStorage, or creates one if it doesn't exist.
 */
export const getDeviceId = (): string => {
  const STORAGE_KEY = 'cropguard_device_id';
  let deviceId = localStorage.getItem(STORAGE_KEY);

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, deviceId);
  }

  return deviceId;
};
