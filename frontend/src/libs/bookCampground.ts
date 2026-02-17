export async function bookCampground(campgroundId: string, bookingDate: string, token: string, namelastname: string, members: Number): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${campgroundId}/bookings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        booking_date: bookingDate,
        namelastname,
        members
      }),
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error during booking API call:", error);
    throw error;
  }
}
