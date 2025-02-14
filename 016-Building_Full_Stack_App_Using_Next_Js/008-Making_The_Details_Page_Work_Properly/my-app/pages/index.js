import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

function HomePage(props) {
    return <MeetupList meetups={props.meetups} />;

}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://anil:FM6C3IkAF2iOVD8y@cluster0.knw6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage;