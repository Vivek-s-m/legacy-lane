import React, { useState } from 'react';
import axios from 'axios';

function AddTemple() {
  const [templeData, setTempleData] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
    latitude: '',
    longitude: '',
    history: '',
    opening: '',
    closing: '',
    specialDarshanTimings: [{ name: '', time: '' }],
    images: [''],  // Array for multiple image URLs
    festivals: [{ name: '', date: '', description: '' }],
    contact: { phone: '', email: '', website: '' }
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempleData({
      ...templeData,
      [name]: value
    });
  };

  const handleArrayInputChange = (e, index, field) => {
    const { name, value } = e.target;
    const updatedArray = [...templeData[field]];
    updatedArray[index][name] = value;
    setTempleData({
      ...templeData,
      [field]: updatedArray
    });
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const updatedImages = [...templeData.images];
    updatedImages[index] = value;
    setTempleData({
      ...templeData,
      images: updatedImages
    });
  };

  const handleAddImage = () => {
    setTempleData({
      ...templeData,
      images: [...templeData.images, '']  // Add a new empty string for the new image URL input
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/temples', templeData);
      setMessage('Temple added successfully!');
      setTempleData({
        name: '',
        city: '',
        state: '',
        address: '',
        latitude: '',
        longitude: '',
        history: '',
        opening: '',
        closing: '',
        specialDarshanTimings: [{ name: '', time: '' }],
        images: [''],  // Reset images to initial empty array
        festivals: [{ name: '', date: '', description: '' }],
        contact: { phone: '', email: '', website: '' }
      });
    } catch (error) {
      setMessage('Failed to add temple, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Contribute Temple Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Temple Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold">Temple Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={templeData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-lg font-semibold">Address</label>
          <textarea
            id="address"
            name="address"
            value={templeData.address}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter the temple address"
            required
          ></textarea>
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="city" className="block text-lg font-semibold">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={templeData.city}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="state" className="block text-lg font-semibold">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={templeData.state}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Coordinates */}
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="latitude" className="block text-lg font-semibold">Latitude</label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={templeData.latitude}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              step="0.0001"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="longitude" className="block text-lg font-semibold">Longitude</label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={templeData.longitude}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              step="0.0001"
              required
            />
          </div>
        </div>

        {/* History */}
        <div className="mb-4">
          <label htmlFor="history" className="block text-lg font-semibold">Temple History</label>
          <textarea
            id="history"
            name="history"
            value={templeData.history}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Write a brief history about the temple"
            required
          ></textarea>
        </div>

        {/* Timings */}
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="opening" className="block text-lg font-semibold">Opening Time</label>
            <input
              type="time"
              id="opening"
              name="opening"
              value={templeData.opening}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="closing" className="block text-lg font-semibold">Closing Time</label>
            <input
              type="time"
              id="closing"
              name="closing"
              value={templeData.closing}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Special Darshan Timings */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Special Darshan Timings</h3>
          {templeData.specialDarshanTimings.map((darshan, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Darshan Name"
                value={darshan.name}
                onChange={(e) => handleArrayInputChange(e, index, 'specialDarshanTimings')}
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="time"
                name="time"
                value={darshan.time}
                onChange={(e) => handleArrayInputChange(e, index, 'specialDarshanTimings')}
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Image URLs */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Temple Images (URL)</h3>
          {templeData.images.map((image, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => handleImageChange(e, index)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="text-blue-600 hover:underline"
          >
            Add another image
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Adding Temple...' : 'Submit Temple Data'}
        </button>
      </form>

      {/* Success/Error Message */}
      {message && (
        <p className={`mt-4 text-center text-lg ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddTemple;
