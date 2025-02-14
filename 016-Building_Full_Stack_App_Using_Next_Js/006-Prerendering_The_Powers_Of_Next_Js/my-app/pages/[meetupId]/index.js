import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { useRouter } from 'next/router';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A first meetup',
        image: 'https://picsum.photos/seed/pwbfsQ/2528/1730',
        address: '430 Durward Burg',
        description: 'This is a first meetup'
    },
    {
        id: 'm2',
        title: 'A second meetup',
        image: 'https://picsum.photos/seed/jfCtSOY/3438/3439',
        address: '55131 Raphael Ferry',
        description: 'This is a second meetup'
    },
    {
        id: 'm3',
        title: 'A third meetup',
        image: 'https://loremflickr.com/2668/181?lock=7461988904623299',
        address: '893 Grange Close',
        description: 'This is a third meetup'
    }

];
function MeetupDetails() {
    const router = useRouter();
    const { meetupId } = router.query;  // Get dynamic meetup ID from URL

    if (!meetupId) {
        return <p>Loading...</p>;  // Handle the case when meetupId is not yet available
    }

    const meetup = DUMMY_MEETUPS.find((item) => item.id === meetupId); // Find the correct meetup

    if (!meetup) {
        return <p>Meetup not found!</p>;
    }

    return (
        <MeetupDetail
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
            description={meetup.description}
        />
    );
}

export default MeetupDetails;