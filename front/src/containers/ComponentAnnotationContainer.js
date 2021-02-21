import { toast } from 'react-toastify'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ComponentAnnotation from '../components/ComponentAnnotation';
import Api from '../api';


function ComponentAnnotationContainer( props ) {

  const { ic_id } = useParams();
  const [ annotation, setAnnotation ] = useState({
    flag_brain: false,
    flag_eyes: false,
    flag_eyes_h: false,
    flag_eyes_v: false,
    flag_muscles: false,
    flag_heart: false,
    flag_line_noise: false,
    flag_ch_noise: false,
    flag_uncertain: false,
    flag_other: false,
    flag_mu: false,
    flag_alpha: false,
    comment: ''
  });

  const [ loading, setLoading ] = useState(true);
  const [ ic, setIc ] = useState({});
  const [ dataset, setDataset ] = useState({});

  useEffect(async () => {
    setLoading(true);
    let _ic = await Api.getJson(`view/ic/${ic_id}`);
    if (_ic.id) {
      setIc(_ic);
      let _dataset = await Api.getJson(`view/datasets/${_ic.dataset}`);
      setDataset(_dataset);
    }

    let _annotation = await Api.getJson(`data/user-annotation-by-ic/${ic_id}`);
    if (_annotation.id) {
      setAnnotation(_annotation);
    }
    setLoading(false);
  }, [ic_id]);

  function handleInputChange (e) {
      const {name, checked} = e.target;
      setAnnotation({...annotation, [name]: checked});
  }

  function handleCommentFieldChange (e) {
      setAnnotation({...annotation, ['comment']: e.target.value});
  }

  async function submit () {
    let response;
    response = await Api.post(`data/user-annotation-by-ic/${ic_id}`, annotation);
    if (response.ok) {
      setAnnotation(await response.json());
      toast.success('Сохранено')
    }
  }

  return (
    <ComponentAnnotation 
      ic={ic} dataset={dataset} onChange={handleInputChange} 
      onCommentFieldChange={handleCommentFieldChange} annotation={annotation} onSubmit={submit} loading={loading}/>    
  )
}

export default ComponentAnnotationContainer;