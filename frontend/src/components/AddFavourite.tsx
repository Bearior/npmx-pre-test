'use client';

import React, { useState } from 'react';

interface AddFavouriteProps {
  campgroundId: string;
  token: string;
}

// TODO: Implement AddFavourite component
// It should:
//   1. Import and call addToFavorites from '@/libs/userFavourite'
//   2. Show a loading state while the request is in progress
//   3. Alert the user on success and reload the page
//   4. Alert the user on failure
//   5. Render a styled button with text 'Add to Favorites'
export default function AddFavourite({ campgroundId, token }: AddFavouriteProps) {
  return (
    <button
      className="mt-5 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-700 hover:to-yellow-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      disabled
    >
      Add to Favorites (Not Implemented)
    </button>
  );
}
