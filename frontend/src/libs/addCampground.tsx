export async function addCampground(
  token: string,
  campgroundData: {
    name: string;
    address: string;
    tel: string;
    image: string;
    description: string;
  }
): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(campgroundData),
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error adding campground:", error);
    throw error;
  }
}
