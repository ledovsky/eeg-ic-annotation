import React from 'react';

function HomePage (props) {
  return (
    <div className="container mx-auto grid grid-cols-2">
      <div className="col-span-1 p-10">
        <h1 className="mt-20 text-4xl">Automated Labeling of Independent Components in EEG</h1>
        <p className="mt-10">The project aims to develop a sustainable algorithm for EEG IC artifact removal and collect a publically available dataset</p>
        <p className="mt-10">Developed in</p>
        <ul className="list-disc ml-10">
          <li className="mt-3"><a className="text-indigo-500 hover:text-indigo-600 font-bold" href="https://www.skoltech.ru/en">Skolkovo Institute of Science and Technology </a></li>
          <li className="mt-3"><a className="text-indigo-500 hover:text-indigo-600 font-bold" href="https://www.ihna.ru/en/">Institute of Higher Nervous Activity and Neurophysiology of Russian Academy of Science</a></li>
        </ul>
      </div>
      <div className="col-span-1">
        <img src="homepage.png" alt=""/>
      </div>
    </div>
  );
}
  
export default HomePage;