  interface CampgroundItem {
    id: string,
    name: string,
    address: string,
    tel: string,
    image: string,
    description: string,
    created_at: string
  }

  interface BookingItem {
    id: string,
    booking_date: string,
    user_id: string,
    campground_id: string,
    namelastname: string,
    members: number,
    created_at: string,
    campground?: CampgroundItem
  }

  interface FavoriteItem {
    id: string,
    user_id: string,
    campground_id: string,
    created_at: string,
    campground?: CampgroundItem
  }