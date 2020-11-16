import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../api'
import DatasetView from '../components/DatasetView'

function DatasetViewContainer(props) {

  const { dataset_id } = useParams();
  const [ params, setParams ] = useState({});
  const [ dataset, setDataset ] = useState({});
  const [ ics, setIcs ] = useState([]);

  useEffect(async () => {
    let dataset = await Api.getJson(`view/datasets/${dataset_id}`);
    setDataset(dataset);
    let collection = await Api.getList('view/ic/list', { dataset: dataset_id});
    setIcs(collection);
  }, [ params ]);


  return (
    <DatasetView dataset={dataset} ics={ics} />
  )
}

export default DatasetViewContainer