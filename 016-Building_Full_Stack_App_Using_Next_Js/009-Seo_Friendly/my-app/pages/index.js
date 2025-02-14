import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

function HomePage(props) {
    return <Fragment>
        <Head>
            <title> React Meetup </title>
            <meta name='description' content='Browse a huge list of higly active React meetups'></meta>
        </Head>
        <MeetupList meetups={props.meetups} />;
    </Fragment>



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