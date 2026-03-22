import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChannelDetails = () => {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const channelResponse = await axios.get(`https://api.example.com/channels/${channelId}`);
        const videosResponse = await axios.get(`https://api.example.com/channels/${channelId}/videos`);

        setChannel(channelResponse.data);
        setVideos(videosResponse.data);
      } catch (err) {
        setError('Failed to load channel details');
        console.error('Error fetching channel details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (channelId) {
      fetchChannelDetails();
    }
  }, [channelId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Channel Not Found</h2>
          <p className="text-gray-600">The requested channel could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Channel Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <img
              src={channel.avatar || '/default-avatar.png'}
              alt={channel.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{channel.name}</h1>
              <p className="text-gray-600">{channel.subscribers || 0} subscribers</p>
              <p className="text-gray-500 mt-2">{channel.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{video.views} views</span>
                  <span className="mx-2">•</span>
                  <span>{video.uploadedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No videos uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelDetails;