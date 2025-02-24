import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { useRouter } from 'next/router';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';


function MeetupDetails(props) {

    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description}></meta>
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>

    );
}
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://anil:FM6C3IkAF2iOVD8y@cluster0.knw6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({}, { projection: { _id: 1 } }).toArray();
    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() },
        }))
    }
}
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://anil:FM6C3IkAF2iOVD8y@cluster0.knw6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const selectedMeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId), });
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    }

}

export default MeetupDetails;