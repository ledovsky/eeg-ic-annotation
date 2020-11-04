import React, { useState, useEffect } from 'react';
import Api from '../api'
import Dataset from '../components/Datasets'

function Datasets(props) {

  const [ params, setParams ] = React.useState({})
  const [ datasets, setDatasets ] = React.useState([])

  useEffect(async () => {
    // Update the document title using the browser API      
    let collection = await Api.getMany('datasets', {})
    setDatasets(collection)
  }, [ params ]);


  return (
    <Dataset datasets={datasets} />
  )
}

export default Datasets