import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'contact_manager';
const COLLECTION_NAME = 'contacts';

app.use(express.json());

const client = new MongoClient(MONGO_URI);

async function connectDB() {
    await client.connect();
    console.log('Connected to MongoDB');
}
connectDB();

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
    address: Joi.string().optional(),
    group: Joi.string().optional()
});

app.post('/contacts', async (req, res) => {
    const { error } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).insertOne(req.body);
    res.status(201).json({ message: 'Contact added', id: result.insertedId });
});

app.get('/contacts', async (req, res) => {
    const db = client.db(DB_NAME);
    const contacts = await db.collection(COLLECTION_NAME).find().toArray();
    res.json(contacts);
});

app.get('/contacts/:id', async (req, res) => {
    const db = client.db(DB_NAME);
    const contact = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
});

app.put("/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid contact ID" });
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.delete('/contacts/:id', async (req, res) => {
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(req.params.id) });
    if (!result.deletedCount) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
