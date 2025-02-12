import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

const details = [
  { id: 1, name: "Yash", role: "Senior Developer" },
  { id: 2, name: "Vaibhav", role: "Backend Developer" },
  { id: 3, name: "Suresh", role: "Frontend Developer" },
];


function DeveloperPage() {
  const router = useRouter();

  const { developerId } = router.query;

  const developer = details.find((item) => item.id === parseInt(developerId));

  if (!developer) {
    return <p> Developer not found!</p>
  }

  return (
    <Fragment>
      <h1>{developer.name}</h1>
      <p>{developer.role}</p>
    </Fragment>
  );

}

export default DeveloperPage;