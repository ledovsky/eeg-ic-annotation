import React from 'react';

function SidebarItem (props) {
  return (
    <p className="pt-6">
      <a className="text-xl text-gray-700 hover:text-gray-900 font-bold" href="/docs">{props.children}</a>
    </p>
  )
}

function SidebarSubItem (props) {
  return (
    <p className="pt-3">
      <a className="text-gray-700 hover:text-gray-900" href="/docs">{props.children}</a>
    </p>
  )
}

function HomePage (props) {
  return (
    <div className="container mx-auto grid grid-cols-4">
      <div className="col-span-1 px-10">
        <SidebarItem>About the ALICE project</SidebarItem>
        <SidebarItem>Annotation Tool Guide</SidebarItem>
        <SidebarSubItem>Getting started</SidebarSubItem>
        <SidebarItem>Dataset Guide</SidebarItem>
      </div>
      <div className="col-span-3 p-10">
        <p className="text-4xl mb-6">About the ALICE Project</p>
        <p className="mt-3">Welcome to ALICE!</p>
        <p className="mt-3">The ALICE project aims to develop a sustainable algorithm for EEG artifact removal and bias-free detection of oscillatory brain activity.</p>
        <p className="mt-6 font-bold">Overview</p>
        <p className="mt-3">Independent Component Analysis (ICA) is a conventional approach to exclude non-brain signals such as eye-movements and muscle artifacts from electroencephalography (EEG). Due to other possible EEG contaminations, a rejection of independent components (ICs) is usually performed in the semiautomatic mode under researchers' visual inspection. The other important ICA application is the detection of alpha and/or mu-rhythm components in the resting-state/motor imaginary conditions. This detection is also highly dependent on the subjective expert opinion, which influences EEG data reproducibility.</p>

      </div>
    </div>
  );
}
  
export default HomePage;