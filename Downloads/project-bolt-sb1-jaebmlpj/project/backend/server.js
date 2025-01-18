import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Temple } from './models/Temple.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://1by23ai189:bmsit123@legacy-lane.fznt1.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get all temples
app.get('/api/temples', async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get temple by ID
app.get('/api/temples/:id', async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a temple
app.post('/api/temples', async (req, res) => {
  try {
    const temple = new Temple(req.body);
    const savedTemple = await temple.save();
    res.status(201).json(savedTemple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add sample data if the database is empty
const addSampleData = async () => {
  const count = await Temple.countDocuments();
  if (count === 0) {
    const sampleTemples = [
      {
        name: "Tirupati",
        location: {
          city: "Tirupati",
          state: "Andhra Pradesh",
          address: "Tirumala, Tirupati, Andhra Pradesh",
          coordinates: {
            latitude: 13.6288,
            longitude: 79.4192
          }
        },
        history: "Tirupati is one of the most famous temples in India, dedicated to Lord Venkateswara. It is located on the Tirumala hills and is one of the richest temples in the world.",
        timings: {
          opening: "3:00 AM",
          closing: "11:00 PM",
          specialDarshanTimings: [
            { name: "VIP Darshan", time: "5:00 AM" },
            { name: "General Darshan", time: "8:00 AM" }
          ]
        },
        images: [
          "https://example.com/images/tirupati1.jpg",
          "https://example.com/images/tirupati2.jpg"
        ],
        festivals: [
          {
            name: "Brahmotsavam",
            date: "September-October",
            description: "A grand annual festival held in honor of Lord Venkateswara."
          },
          {
            name: "Vaikuntha Ekadasi",
            date: "December",
            description: "A significant day when devotees believe Lord Vishnu opens the gates of Vaikuntha."
          }
        ],
        contact: {
          phone: "+91 877 226 4700",
          email: "info@tirumala.org",
          website: "http://www.tirumala.org"
        }
      },
      {
        name: "Rameswaram",
        location: {
          city: "Rameswaram",
          state: "Tamil Nadu",
          address: "Ramanathaswamy Temple, Rameswaram, Tamil Nadu",
          coordinates: {
            latitude: 9.2885,
            longitude: 79.3123
          }
        },
        history: "Rameswaram is a significant pilgrimage site, known for the Ramanathaswamy Temple dedicated to Lord Shiva. It is believed to be the place where Lord Rama built a bridge to Lanka.",
        timings: {
          opening: "5:00 AM",
          closing: "1:00 PM",
          specialDarshanTimings: [
            { name: "VIP Darshan", time: "6:00 AM" },
            { name: "General Darshan", time: "9:00 AM" }
          ]
        },
        images: [
          "https://example.com/images/rameswaram1.jpg",
          "https://example.com/images/rameswaram2.jpg"
        ],
        festivals: [
          {
            name: "Mahashivaratri",
            date: "February-March",
            description: "A night dedicated to Lord Shiva, observed with fasting and night-long vigils."
          },
          {
            name: "Ramanavami",
            date: "March-April",
            description: "Celebration of the birth of Lord Rama, with special prayers and processions."
          }
        ],
        contact: {
          phone: "+91 4563 222 222",
          email: "info@rameswaram.org",
          website: "http://www.ramanathaswamy.org"
        }
      },
      {
        name: "Madurai Meenakshi Temple",
        location: {
          city: "Madurai",
          state: "Tamil Nadu",
          address: "Meenakshi Amman Temple, Madurai, Tamil Nadu",
          coordinates: {
            latitude: 9.9193,
            longitude: 78.1198
          }
        },
        history: "The Meenakshi Temple is dedicated to Goddess Meenakshi and her consort, Lord Sundareswarar. It is renowned for its stunning architecture and intricate sculptures.",
        timings: {
          opening: "5:00 AM",
          closing: "12:30 PM",
          specialDarshanTimings: [
            { name: "VIP Darshan", time: "6:00 AM" },
            { name: "General Darshan", time: "9:00 AM" }
          ]
        },
        images: [
          "https://example.com/images/meenakshi1.jpg",
          "https://example.com/images/meenakshi2.jpg"
        ],
        festivals: [
          {
            name: "Meenakshi Thirukalyanam",
            date: "April-May",
            description: "The celestial wedding of Goddess Meenakshi and Lord Sundareswarar, celebrated with grandeur."
          },
          {
            name: "Chithirai Festival",
            date: "April",
            description: "A month-long festival marking the beginning of the Tamil New Year, with various cultural events."
          }
        ],
        contact: {
          phone: "+91 452 234 4080",
          email: "info@meenakshi.org",
          website: "http://www.meenakshi.org"
        }
      },
      {
        name: "Kanchipuram",
        location: {
          city: "Kanchipuram",
          state: "Tamil Nadu",
          address: "Kanchipuram, Tamil Nadu",
          coordinates: {
            latitude: 12.8312,
            longitude: 79.7055
          }
        },
        history: "Kanchipuram, known as the 'City of Thousand Temples,' is a significant pilgrimage destination with numerous ancient temples.",
        timings: {
          opening: "6:00 AM",
          closing: "12:00 PM",
          specialDarshanTimings: [
            { name: "VIP Darshan", time: "7:00 AM" },
            { name: "General Darshan", time: "10:00 AM" }
          ]
        },
        images: [
          "https://example.com/images/kanchipuram1.jpg",
          "https://example.com/images/kanchipuram2.jpg"
        ],
        festivals: [
          {
            name: "Vaikasi Visakam",
            date: "May-June",
            description: "Celebration of the birth of Lord Vishnu, observed with special prayers and processions."
          },
          {
            name: "Panguni Uthiram",
            date: "March-April",
            description: "A festival commemorating the marriage of Lord Sundareswarar and Goddess Meenakshi."
          }
        ],
        contact: {
          phone: "+91 4172 220 220",
          email: "info@kanchipuram.org",
          website: "http://www.kanchipuram.org"
        }
      },
      {
        name: "Sabarimala",
        location: {
          city: "Sabarimala",
          state: "Kerala",
          address: "Sabarimala, Kerala",
          coordinates: {
            latitude: 9.4975,
            longitude: 77.1042
          }
        },
        history: "Sabarimala is a renowned pilgrimage site dedicated to Lord Ayyappa. The temple is situated in the Periyar Tiger Reserve in the Western Ghats, attracting millions of devotees every year, especially during the Mandala-Makaravilakku season.",
        timings: {
          opening: "4:00 AM",
          closing: "10:00 PM",
          specialDarshanTimings: [
            { name: "VIP Darshan", time: "5:00 AM" },
            { name: "General Darshan", time: "7:00 AM" }
          ]
        },
        images: [
          "https://example.com/images/sabarimala1.jpg",
          "https://example.com/images/sabarimala2.jpg"
        ],
        festivals: [
          {
            name: "Makaravilakku",
            date: "January",
            description: "The most important festival, marking the culmination of the pilgrimage season with a special ceremony of the sacred fire."
          },
          {
            name: "Mandala Puja",
            date: "November-December",
            description: "A special 41-day pilgrimage season dedicated to Lord Ayyappa, culminating in the Makaravilakku festival."
          }
        ],
        contact: {
          phone: "+91 473 686 3280",
          email: "info@sabarimala.org",
          website: "http://www.sabarimala.org"
        }
      }
    ];
    

    try {
      await Temple.insertMany(sampleTemples);
      console.log('Sample data added successfully');
    } catch (error) {
      console.error('Error adding sample data:', error);
    }
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  addSampleData();
});