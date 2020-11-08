import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ComponentAnnotation from '../components/ComponentAnnotation'
import Api from '../api'


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
  })

  const [ ic, setIc ] = useState({})

  useEffect(async () => {
    let _ic = await Api.getJson(`ic/${ic_id}`, {})
    if (_ic.id) {
      setIc(_ic)
    }
    let _annotation = await Api.getJson('user-annotation', { ic_id: ic_id })
    if (_annotation.id) {
      setAnnotation(_annotation)
    }
  }, []);

  function handleInputChange (e) {
      const {name, value} = e.target;
      setAnnotation({...annotation, [name]: value});
  }

  async function submit () {
    console.log(annotation);
    console.log(ic);
    if (annotation.id) {
      let _annotation = await Api.put(`annotations/${annotation.id}`, annotation)
      setAnnotation(_annotation)
    } else {
      let _annotation = await Api.post(`annotations`, annotation)
      setAnnotation(_annotation)
    }
  }


  return (
    <ComponentAnnotation ic={ic} onChange={handleInputChange} onSubmit={submit} ic={ic}/>    
  )
}

export default ComponentAnnotationContainer;