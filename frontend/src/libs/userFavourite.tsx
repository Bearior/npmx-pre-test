// TODO: Implement addToFavorites function
// It should:
//   1. First GET /api/v1/favorites to check if already favorited
//   2. If not already favorited, POST /api/v1/favorites with { campground_id } in body
//   3. Include Authorization Bearer token header in both requests
//   4. Return the JSON response from the POST
//   5. Throw errors on failure
export async function addToFavorites(token: string, campgroundId: string) {
    throw new Error("Not implemented");
}

// TODO: Implement removeFromFavorites function
// It should:
//   1. Send DELETE to /api/v1/favorites/:favoriteId
//   2. Include Authorization Bearer token header
//   3. Return the JSON response
//   4. Throw errors on failure
export async function removeFromFavorites(token: string, favoriteId: string) {
    throw new Error("Not implemented");
}
