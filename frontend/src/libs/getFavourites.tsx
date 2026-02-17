// TODO: Implement getFavourites function
// It should:
//   1. GET /api/v1/favorites with Authorization Bearer token header
//   2. Parse the JSON response and extract the 'data' array
//   3. Normalize each favorite object: spread campground data, add favoriteId and campground_id
//   4. Return format: [{ ...campground fields, favoriteId: favorite.id, campground_id: favorite.campground_id }, ...]
//   5. Throw errors on failure or invalid response format
export default async function getFavourites(token: string) {
    throw new Error("Not implemented");
}
