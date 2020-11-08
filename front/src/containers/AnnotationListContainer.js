import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnnotationList from '../components/AnnotationList';
import Api from '../api';


function AnnotationListContainer (props) {

  const { ic_id } = useParams();
  const [ ic, setIc ] = useState({})
  const [ annotations, setAnnotations ] = useState([]);

  useEffect(async () => {
    let _ic = await Api.getJson(`ic/${ic_id}`, {})
    if (_ic.id) {
      setIc(_ic)
    }
    let _annotations = await Api.getList('annotations', { ic_id: ic_id })
    setAnnotations(_annotations)
  }, []);

  return (
    <AnnotationList annotations={annotations} ic={ic}/>
  )
}

export default AnnotationListContainer;