const express = require('express');
const doctorRouter = express.Router();
const Doctor = require('../Model/Doctor.model');

doctorRouter.post('/add', async (req, res) => {
  try {
    const {
      name,
      imageUrl,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    } = req.body;

    await Doctor.create({
      name,
      imageUrl,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });

    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


doctorRouter.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


doctorRouter.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      imageUrl,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    } = req.body;

    await Doctor.findByIdAndUpdate(id, {
      name,
      imageUrl,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });

    res.status(200).json({ message: 'Doctor updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



doctorRouter.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = doctorRouter;
