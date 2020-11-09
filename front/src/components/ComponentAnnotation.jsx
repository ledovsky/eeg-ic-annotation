import { React } from 'react';
import AnnotationBar from './AnnotationBar';
import Button from '../common/Button';


function CheckboxField( props ) {
  return (
        <div className="flex mt-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" name={props.name} onChange={props.onChange}/>
                <span class="ml-2">{props.children}</span>
            </label>
        </div>
  )
}

function ComponentAnnotation( props ) {
  return (
    <div>
      <AnnotationBar ic={props.ic} state="annotation"/>
      <div className="mx-6 mt-6 flex">
        <div className="w-full max-w-sm">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="flex">
              <p className="font-bold">Select IC classes</p>
            </div>
            <CheckboxField name="flag_brain" onChange={props.onChange}>Brain</CheckboxField>
            <CheckboxField name="flag_eyes" onChange={props.onChange}>Eyes</CheckboxField>
            <CheckboxField name="flag_muscles" onChange={props.onChange}>Muscles</CheckboxField>
            <CheckboxField name="flag_heart" onChange={props.onChange}>Heart</CheckboxField>
            <CheckboxField name="flag_ch_noise" onChange={props.onChange}>Channel noise</CheckboxField>
            <CheckboxField name="flag_line_noise" onChange={props.onChange}>Line noise</CheckboxField>
            <div class="flex mt-6">
              <Button onClick={props.onSubmit}>Save</Button>
            </div>
          </form>
        </div>
        <div className="w-full px-6 max-w-md">
          <p className="text-center font-bold">Topomap of the component</p>
          { props.ic.images ?
            <img src={props.ic.images.img_topomap} alt=""/> : <div></div>
          }
        </div>
        <div className="w-full px-6 max-w-md">
          <p className="text-center font-bold">Spectrum</p>
          { props.ic.images ?
            <img src={props.ic.images.img_spectrum} alt=""/> : <div></div>
          }
        </div>
        <div className="w-full px-6 max-w-md">
          <p className="text-center font-bold">Epochs image</p>
          { props.ic.images ?
            <img src={props.ic.images.img_epochs_image} alt=""/> : <div></div>
          }
        </div>
      </div>
    </div>
  )
}

export default ComponentAnnotation;