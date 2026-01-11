# Quick Start Guide

## Prerequisites Check
- ✅ Node.js installed (check with `node --version`)
- ✅ MongoDB running locally OR MongoDB Atlas account

## Quick Setup (5 minutes)

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on `http://localhost:5000`

### 2. Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000` (opens automatically)

## First Steps

1. **MongoDB Setup**:
   - If using local MongoDB: Make sure it's running (`mongod`)
   - If using MongoDB Atlas: Update `MONGODB_URI` in `backend/server.js`

2. **Test the API**:
   - Visit `http://localhost:5000/api/health` - should return `{"status":"OK"}`

3. **Start Logging Waste**:
   - Open `http://localhost:3000`
   - Fill out the form to log your first waste item
   - Watch the dashboard update with your impact!

## Demo Tips

1. Log a few items from different categories
2. Show the real-time dashboard updates
3. Point out the CO₂, volume, and decomposition calculations
4. Demonstrate the trend charts
5. Mention scalability (user auth, goals, etc.)

## Troubleshooting

**Backend won't start?**
- Check if port 5000 is available
- Ensure MongoDB is running
- Check `backend/server.js` for correct MongoDB URI

**Frontend won't connect to backend?**
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify `API_URL` in frontend components matches backend URL

**No data showing?**
- Check MongoDB connection
- Try logging a new waste item
- Check browser console for API errors
