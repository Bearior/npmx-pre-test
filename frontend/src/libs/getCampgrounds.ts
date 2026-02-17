export async function getCampgrounds() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campground`, {
    cache: 'no-store', // Disable caching to ensure fresh data
  });
  if (!response.ok) {
    throw new Error('Failed to fetch campgrounds');
  }
  const result = await response.json();
  return result; // Ensure the full response is returned
}
