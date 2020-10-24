import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../api'
import DatasetView from '../components/DatasetView'

function DatasetViewContainer(props) {

  const { dataset_name } = useParams()
  const [ params, setParams ] = useState({})
  const [ ics, setDatasets ] = useState([])

  useEffect(async () => {
    let res = await Api.getList('datasets', { short_name: dataset_name})
    let [ dataset ] = res;
    let collection = await Api.getList('ic', { dataset: dataset.id})
    setDatasets(collection)
  }, [ params ]);


  return (
    <DatasetView ics={ics} />
  )
}

export default DatasetViewContainer