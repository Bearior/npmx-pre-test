export async function getCampground(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch campground with ID: ${id}`);
  }
  return response.json();
}
