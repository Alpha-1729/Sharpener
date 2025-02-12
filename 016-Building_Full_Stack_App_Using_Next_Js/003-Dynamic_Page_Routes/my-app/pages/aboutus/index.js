import React, { Fragment } from 'react';


const details = [
  { id: 1, name: 'Yash', role: 'Senior Developer' },
  { id: 2, name: 'Vaibhav', role: 'Backend Developer' },
  { id: 3, name: 'Suresh', role: 'Frontend Developer' }
]
function AboutPage() {
  return (
    <Fragment>
      <ul>
        {details.map((item) => (
          <li key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.role}</p>
          </li>
        ))}
      </ul>
    </Fragment>
  );

}

export default AboutPage;