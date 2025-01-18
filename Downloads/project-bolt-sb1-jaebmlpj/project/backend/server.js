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
        "name": "Sri Venkateswara Temple, Tirumala",
        "location": {
          "city": "Tirumala",
          "state": "Andhra Pradesh",
          "address": "Tirumala, Tirupati, Andhra Pradesh, India",
          "latitude": 13.6288,
          "longitude": 79.3977
        },
        "history": "Sri Venkateswara Temple is dedicated to Lord Venkateswara, an incarnation of Lord Vishnu. It is one of the most visited pilgrimage sites in the world, with a history spanning over centuries.",
        "timings": {
          "opening": "4:30 AM",
          "closing": "10:00 PM",
          "specialDarshanTimings": [
            {
              "name": "VIP Darshan",
              "time": "6:00 AM"
            }
          ]
        },
        "festivals": [
          {
            "name": "Brahmotsavam",
            "date": "September/October",
            "description": "A grand festival celebrating the temple's presiding deity, with elaborate rituals and processions."
          }
        ],
        "images": [
          "https://th.bing.com/th/id/OIP.CX-Vu8BLO3h1S_Ce_-2S2gHaD4?w=341&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          "https://tfiglobalnews.com/wp-content/uploads/2023/01/Sri-Venkateswara-Swamy-Vaari-Temple-festival.jpg"
        ],
        "contact": {
          "phone": "+91 877 226 3456",
          "email": "info@tirumala.org",
          "website": "http://www.tirumala.org"
        }
      },
      {
        "name": "Meenakshi Amman Temple",
        "location": {
          "city": "Madurai",
          "state": "Tamil Nadu",
          "address": "Madurai, Tamil Nadu, India",
          "latitude": 9.9194,
          "longitude": 78.1198
        },
        "history": "The Meenakshi Amman Temple is an ancient Hindu temple dedicated to Meenakshi, an avatar of Parvati, and her consort Sundareswarar, an aspect of Shiva. It has a rich history and is a prominent pilgrimage site.",
        "timings": {
          "opening": "5:00 AM",
          "closing": "10:00 PM",
          "specialDarshanTimings": [
            {
              "name": "Golden Lily Pond Darshan",
              "time": "9:00 AM"
            }
          ]
        },
        "festivals": [
          {
            "name": "Meenakshi Thirukalyanam",
            "date": "April-May",
            "description": "A grand wedding festival of Meenakshi and Sundareswarar with a procession and various rituals."
          }
        ],
        "images": [
          "https://lh3.ggpht.com/_xFP6s39OUYY/Talantw7rnI/AAAAAAAAq8U/xX4HMQm5S7M/madurai-temple.night-photos_thumb[2].jpg?imgmax=800",
          "https://i.pinimg.com/originals/e8/60/63/e8606362331ac8d4ddd773cc3c059867.jpg"
        ],
        "contact": {
          "phone": "+91 452 234 5678",
          "email": "meenakshi@temple.org",
          "website": "http://www.meenakshitemple.org"
        }
      },
      {
        "name": "Ramanathaswamy Temple",
        "location": {
          "city": "Rameswaram",
          "state": "Tamil Nadu",
          "address": "Rameswaram, Tamil Nadu, India",
          "latitude": 9.2885,
          "longitude": 79.3120
        },
        "history": "The Ramanathaswamy Temple is dedicated to Lord Shiva and is one of the twelve Jyotirlingas. It is located in Rameswaram, which is believed to be the place where Lord Rama worshiped Shiva to atone for his sins.",
        "timings": {
          "opening": "5:00 AM",
          "closing": "12:00 PM",
          "specialDarshanTimings": [
            {
              "name": "Abhisheka Darshan",
              "time": "6:00 AM"
            }
          ]
        },
        "festivals": [
          {
            "name": "Maha Shivaratri",
            "date": "February/March",
            "description": "A major festival dedicated to Lord Shiva, with fasting, prayers, and night vigils."
          }
        ],
        "images": [
          "https://example.com/temple5.jpg",
          "https://example.com/temple6.jpg"
        ],
        "contact": {
          "phone": "+91 456 789 0123",
          "email": "rameswaram@temple.org",
          "website": "http://www.rameswaramtemple.org"
        }
      },
      {
        "name": "Brihadeeswarar Temple",
        "location": {
          "city": "Thanjavur",
          "state": "Tamil Nadu",
          "address": "Thanjavur, Tamil Nadu, India",
          "latitude": 10.7844,
          "longitude": 79.1309
        },
        "history": "Brihadeeswarar Temple, also known as the Big Temple, is one of the largest temples in India and is dedicated to Lord Shiva. It was built during the Chola dynasty and is a UNESCO World Heritage Site.",
        "timings": {
          "opening": "6:00 AM",
          "closing": "9:00 PM",
          "specialDarshanTimings": [
            {
              "name": "Main Sanctum Darshan",
              "time": "8:00 AM"
            }
          ]
        },
        "festivals": [
          {
            "name": "Maha Shivaratri",
            "date": "February/March",
            "description": "A grand festival celebrating Lord Shiva with rituals, prayers, and performances."
          }
        ],
        "images": [
          "https://th.bing.com/th/id/OIP.JpTUec6kjWiIQr1PB0Ge4QHaEj?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          "https://th.bing.com/th/id/OIP.n2t_A6TwKBz5xbg2IwTFdAHaEl?rs=1&pid=ImgDetMain"
        ],
        "contact": {
          "phone": "+91 436 221 2345",
          "email": "brihadeeswarar@temple.org",
          "website": "http://www.bigtemple.org"
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