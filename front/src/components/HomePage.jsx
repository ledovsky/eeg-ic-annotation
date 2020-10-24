import React, { Component } from 'react'

class HomePage extends Component {
    constructor (props) {
      super(props);
    }
  
    componentDidMount () {
    }
  
    render() {
      return (
        <div className="container mx-auto grid grid-cols-2">
          <div className="col-span-1 p-10">
            <h1 className="mt-20 text-4xl">Skoltech/IHNA EEG ICA Project</h1>
            <p className="mt-10">The project aims to develop a sustainable algorithm for EEG IC artifact removal and collect a publically available dataset</p>
          </div>
          <div className="col-span-1">
            <img src="homepage.png" alt=""/>
          </div>
        </div>
      );
    }
  }
  
  export default HomePage;