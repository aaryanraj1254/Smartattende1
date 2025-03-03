const Event = require('../models/Event');

// Get all events (public)
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Create event (Organizer/Admin only)
const createEvent = async (req, res) => {
  try {
    const { title, date, location } = req.body;
    const newEvent = new Event({ title, date, location, createdBy: req.user.id });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event' });
  }
};

// Update event (Organizer/Admin only)
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event' });
  }
};

// Delete event (Organizer/Admin only)
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event' });
  }
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
