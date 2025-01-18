import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/temples');
        setTemples(response.data);
      } catch (error) {
        console.error('Error fetching temples:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemples();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Indian Temples</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {temples.map((temple) => (
          <Link
            key={temple._id}
            to={`/temple/${temple._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {temple.images[0] && (
              <img
                src={temple.images[0]}
                alt={temple.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{temple.name}</h2>
              <p className="text-gray-600">{temple.location.city}, {temple.location.state}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Opening Hours: {temple.timings.opening} - {temple.timings.closing}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;