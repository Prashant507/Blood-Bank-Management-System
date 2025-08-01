const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://prashantindap507:hHXBt6Wipdc1Cwxq@cluster0.fq3ivhk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Donor schema and model
const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  age: Number,
  contact: String,
  city: String,
  lastDonationDate: Date,
});

const Donor = mongoose.model('Donor', donorSchema);

// Routes

// Get all donors
app.get('/api/donors', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new donor
app.post('/api/donors', async (req, res) => {
  const donor = new Donor(req.body);
  try {
    const savedDonor = await donor.save();
    res.status(201).json(savedDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update donor by id
app.put('/api/donors/:id', async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete donor by id
app.delete('/api/donors/:id', async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Donor deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
