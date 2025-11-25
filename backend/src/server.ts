import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'VECT Backend API' });
});

// Routes Placeholder
// app.use('/api/ai', aiRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
