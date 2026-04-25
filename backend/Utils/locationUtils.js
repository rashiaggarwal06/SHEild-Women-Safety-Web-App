// Utility function for location processing (could be extended for advanced operations)
export const processLocation = (lat, long) => {
  if (!lat || !long) {
    throw new Error('Invalid location data');
  }

  // You can integrate with external APIs or perform some other operations here
  return { lat, long };
};
