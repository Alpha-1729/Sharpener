import MeetupList from '../components/meetups/MeetupList';
// import { faker } from '@faker-js/faker';


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

console.log(DUMMY_MEETUPS);
function HomePage() {
    return <MeetupList meetups={DUMMY_MEETUPS} />;


}

export default HomePage;