import MeetupList from '../components/meetups/MeetupList';
// import { faker } from '@faker-js/faker';
import { MongoClient } from 'mongodb';

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A first meetup',
//         image: 'https://picsum.photos/seed/pwbfsQ/2528/1730',
//         address: '430 Durward Burg',
//         description: 'This is a first meetup'
//     },
//     {
//         id: 'm2',
//         title: 'A second meetup',
//         image: 'https://picsum.photos/seed/jfCtSOY/3438/3439',
//         address: '55131 Raphael Ferry',
//         description: 'This is a second meetup'
//     },
//     {
//         id: 'm3',
//         title: 'A third meetup',
//         image: 'https://loremflickr.com/2668/181?lock=7461988904623299',
//         address: '893 Grange Close',
//         description: 'This is a third meetup'
//     }

// ];

// console.log(DUMMY_MEETUPS);
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