import Image from 'next/image';
import { getCampground } from '@/libs/getCampground';
import BookingButton from '@/components/BookingButton';
import AddFavourite from '@/components/AddFavourite';
import RemoveFavourite from '@/components/RemoveFavourite';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import UpdateButton from '@/components/UpdateButton';
import getUserProfile from '@/libs/getUserProfile';

export default async function CampgroundDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const profile = session ? await getUserProfile(session.user.token) : null;

  const campgroundDetail = await getCampground(id);

    if (!session || !session.user) {
        throw new Error("User session is not available");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/favorites`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${session.user.token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch favourites");
    }

    const Favs = await response.json();

    const favourites = Favs.data.map((fav: any) => ({
        campgroundId: fav.campground?.id || fav.campground_id,
        favouriteId: fav.id,
    }));

    const favouriteEntry = favourites.find((fav: { campgroundId: string; }) => fav.campgroundId === id);
    const isFavourite = !!favouriteEntry;

  return (
    <main className="min-h-screen flex flex-col text-center p-10 bg-gray-50 mt-4">
      <h1 className="text-5xl font-extrabold text-gray-500 mb-16">
        {campgroundDetail.data.name}
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 my-8">
        <div className="w-full md:w-1/3">
          <Image
            src={campgroundDetail.data.image}
            width={500}
            height={300}
            sizes="100vw"
            alt="Campground Image"
            className="rounded-lg w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div className="text-left w-full md:w-2/3 mt-6 md:mt-0">
          <div className="text-lg text-gray-700 mb-2">
            <strong>Name:</strong> {campgroundDetail.data.name}
          </div>
          <div className="text-lg text-gray-700 mb-2">
            <strong>Address:</strong> {campgroundDetail.data.address}
          </div>
          <div className="text-lg text-gray-700 mb-2">
            <strong>Telephone:</strong> {campgroundDetail.data.tel}
          </div>
          <div className="text-lg text-gray-700 mb-4">
            <strong>Description:</strong> {campgroundDetail.data.description}
          </div>
        </div>
      </div>
      {session && session.user && (
        <div className="space-x-4 mt-6 flex justify-center">
          {isFavourite ? (
            <RemoveFavourite
              campgroundId={favouriteEntry?.favouriteId}
              token={session.user.token}
            />
          ) : (
            <AddFavourite
              campgroundId={id}
              token={session.user.token}
            />
          )}
          <BookingButton
            campgroundId={id}
            token={session.user.token}
          />

          {/* ---------------- admin only components --------------------- */}
          {profile.data.role === "admin" && (
            <UpdateButton 
              campgroundId={id} 
              token={session.user.token}
              currentData={{
                name: campgroundDetail.data.name,
                address: campgroundDetail.data.address,
                tel: campgroundDetail.data.tel,
                description: campgroundDetail.data.description,
                image: campgroundDetail.data.image,
              }}
            />
          )}
        </div>
      )}
</main>
  );
}