# Waste Impact Tracker 

A MERN stack application that helps users track their daily waste and understand their environmental impact through CO₂ emissions, landfill volume, and decomposition time calculations.

## Features

- **Log Daily Waste**: Track waste items by category (plastic, food, paper, e-waste)
- **Impact Calculations**: 
  - CO₂ equivalent emissions
  - Landfill volume
  - Decomposition time
- **Visual Dashboard**: 
  - Real-time statistics
  - Trend charts showing daily CO₂ and volume
  - Category breakdown
- **Waste History**: View and manage all logged waste items

## Tech Stack

- **MongoDB**: Database for storing waste logs
- **Express**: RESTful API backend
- **React**: Interactive frontend dashboard
- **Node.js**: Server-side calculations and API

## Project Structure

```
Node Database/
├── backend/
│   ├── models/
│   │   └── WasteLog.js
│   ├── routes/
│   │   └── wasteRoutes.js
│   ├── utils/
│   │   └── calculations.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── WasteLogForm.js
│   │   │   └── WasteLogList.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB (if running locally):
```bash
# Make sure MongoDB is running on localhost:27017
# Or update the MONGODB_URI in server.js
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

### GET `/api/waste`
Get all waste logs

### POST `/api/waste`
Create a new waste log
```json
{
  "item": "Plastic bottle",
  "category": "plastic",
  "quantity": 1,
  "unit": "piece"
}
```

### GET `/api/waste/stats`
Get aggregated statistics and trends

### DELETE `/api/waste/:id`
Delete a waste log by ID

## Usage

1. **Log Waste**: Fill out the form to log a waste item
   - Enter item name
   - Select category (plastic, food, paper, e-waste)
   - Enter quantity and unit

2. **View Impact**: The dashboard automatically updates showing:
   - Total items logged
   - Total CO₂ equivalent
   - Total landfill volume
   - Category breakdown
   - Daily trends

3. **Track Trends**: Charts show your daily CO₂ emissions and waste volume over time

## Demo Notes

- Clear, visual impact display
- Easy to demonstrate waste tracking
- Shows personal environmental footprint
- Scalable architecture for future features

## Future Enhancements

- User authentication
- Multiple user support
- Export data functionality
- Goal setting and achievements
- Social sharing of impact
- More detailed waste categories
- Barcode scanning for products
