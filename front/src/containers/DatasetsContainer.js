import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Api from '../api';
import Dataset from '../components/Datasets';


function Datasets(props) {

  const datasets = useSelector(store => store.datasets);

  // useEffect(async () => {
  //   // Update the document title using the browser API      
  //   let collection = await Api.getList('view/datasets/list', {})
  //   setDatasets(collection)
  // }, [ params ]);


  return (
    <Dataset datasets={datasets} />
  )
}

export default Datasets