import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://anil:FM6C3IkAF2iOVD8y@cluster0.knw6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

        const db = client.db();

        const meetupCollection = db.collection('meetups');

        const result = await meetupCollection.insertOne(data);
        client.close();

        // console.log(result);

        res.status(201).json({ message: 'Meetup inserted!' });
    }
}

export default handler;