import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ComponentAnnotation from '../components/ComponentAnnotation';
import Api from '../api';


function ComponentAnnotationContainer( props ) {

  const { ic_id } = useParams();
  const [ annotation, setAnnotation ] = useState({
    id: null,
    ic: ic_id,
    user: null,
    flag_brain: false,
    flag_eyes: false,
    flag_muscles: false,
    flag_heart: false,
    flag_line_noise: false,
    flag_ch_noise: false,
    comment: ''
  });

  const [ ic, setIc ] = useState({});

  useEffect(async () => {
    let _ic = await Api.getJson(`ic/${ic_id}`, {})
    if (_ic.id) {
      setIc(_ic);
    }
    let _annotation = await Api.getJson('user-annotation', { ic_id: ic_id })
    if (_annotation.id) {
      setAnnotation(_annotation);
    }
  }, []);

  function handleInputChange (e) {
      const {name, checked} = e.target;
      setAnnotation({...annotation, [name]: checked});
  }

  async function submit () {
    let response;
    if (annotation.id) {
      response = await Api.patch(`annotations/${annotation.id}`, annotation);
    } else {
      response = await Api.post(`annotations`, annotation);
    }
    if (response.ok) {
      setAnnotation(await response.json());
    }
  }

  return (
    <ComponentAnnotation ic={ic} onChange={handleInputChange} annotation={annotation} onSubmit={submit} ic={ic}/>    
  )
}

export default ComponentAnnotationContainer;