'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { removeFromFavorites } from '@/libs/userFavourite';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface CampgroundData {
  name: string;
  address: string;
  tel: string;
  image: string;
  description: string;
}

interface CampgroundActionsProps {
  token: string;
  campgroundId?: string;
  isAdmin: boolean;
  favorites?: { id: string; favoriteId: string; campground_id: string }[];
}

export default function CampgroundActions({
  token,
  campgroundId,
  isAdmin,
  favorites = [],
}: CampgroundActionsProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<CampgroundData>({
    name: '',
    address: '',
    tel: '',
    image: '',
    description: '',
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', address: '', tel: '', image: '', description: '' });
  };

  const handleAddCampground = async () => {
    if (!formData.name || !formData.address || !formData.tel || !formData.image || !formData.description) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Campground added successfully!');
        handleClose();
        router.refresh();
      } else {
        const errorData = await response.text();
        alert(`Failed to add campground: ${errorData}`);
      }
    } catch (error) {
      console.error('Error adding campground:', error);
      alert('An error occurred while adding the campground');
    }
  };

  const handleDeleteCampground = async () => {
    if (!campgroundId) return;

    const confirmDelete = confirm('Are you sure you want to delete this campground?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${campgroundId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete campground');
      }

      const favoriteToDelete = favorites.find((fav) => fav.campground_id === campgroundId);
      if (favoriteToDelete) {
        await removeFromFavorites(token, favoriteToDelete.favoriteId);
      }

      alert('Campground deleted successfully!');
      router.refresh();
    } catch (error) {
      console.error('Error deleting campground:', error);
      alert('An error occurred while deleting the campground');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'tel') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: digitsOnly });
      return;
    }
    if (name === 'name' && value.length > 50) return;
    if (name === 'description' && value.length > 500) return;
    setFormData({ ...formData, [name]: value });
  };

  if (!mounted) {
    return null;
  }

  return isAdmin ? (
    <>
      <button
        onClick={handleOpen}
        className="px-6 py-3 rounded-lg mb-4 shadow-md transition-all duration-300 transform bg-green-500 hover:bg-green-600 focus:ring-green-300 text-white hover:scale-105 active:scale-95 focus:ring-4"
      >
        Add Campground
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="text-gray-900 font-bold text-2xl text-center">
          Add New Campground
        </DialogTitle>
        <DialogContent className="space-y-4 px-6 pb-4">
          <TextField
            label="Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
            helperText={`${formData.name.length}/50`}
            className="rounded-lg"
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            required
            value={formData.address}
            onChange={handleChange}
            helperText={formData.address.length === 0 ? 'Address is required' : ''}
            className="rounded-lg"
          />
          <TextField
            label="Telephone"
            name="tel"
            fullWidth
            required
            value={formData.tel}
            onChange={handleChange}
            inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
            helperText={`Numbers only, ${formData.tel.length}/10`}
            className="rounded-lg"
          />
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            required
            value={formData.image}
            onChange={handleChange}
            className="rounded-lg"
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            required
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            inputProps={{ maxLength: 500 }}
            helperText={`${formData.description.length}/500`}
            className="rounded-lg"
          />
        </DialogContent>
        <DialogActions className="flex justify-between px-6 pb-4">
          <Button
            onClick={handleClose}
            className="text-red-500 font-semibold hover:text-red-700 transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddCampground}
            className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <button
      onClick={handleDeleteCampground}
      className="absolute top-2 right-2 bg-red-500 text-white px-2.5 py-1 rounded shadow transition-all duration-300 transform hover:bg-red-600 hover:scale-105 active:bg-red-700 active:scale-95 focus:ring-2 focus:ring-red-300 text-sm"
    >
      Delete
    </button>
  );
}