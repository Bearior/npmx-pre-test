'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface UpdateButtonProps {
  campgroundId: string;
  token: string;
  currentData?: {
    name: string;
    address: string;
    tel: string;
    description: string;
    image: string;
  };
}

export default function UpdateButton({ campgroundId, token, currentData }: UpdateButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    tel: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    if (currentData) {
      setFormData({
        name: currentData.name || '',
        address: currentData.address || '',
        tel: currentData.tel || '',
        description: currentData.description || '',
        image: currentData.image || '',
      });
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', address: '', tel: '', description: '', image: '' });
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

  const handleUpdate = async () => {
    if (!formData.name || !formData.address || !formData.tel || !formData.description || !formData.image) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${campgroundId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('Campground updated successfully!');
        window.location.reload(); // Reload the page to fetch updated details
      } else {
        alert('Failed to update campground.');
      }
    } catch (error) {
      console.error('Error updating campground:', error);
      alert('An error occurred while updating the campground.');
    }
    handleClose();
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="mt-5 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Update Campground
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="text-gray-900 font-bold text-2xl text-center">
          Update Campground
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
            error={formData.address.length === 0 && open}
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
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            required
            value={formData.image}
            onChange={handleChange}
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
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
