import React from 'react';
import AnnotationBar from './AnnotationBar';
import Check from '../common/Check';


function AnnotationList (props) {
  const rows = props.annotations.map((a) =>
    <tr key={a.id.toString()}>
      <td className="border px-4 py-2">{a.user}</td>
      <td className="border px-4 py-2"></td>
      <td className="border px-4 py-2"> <Check flag={a.flag_brain} /> </td>
      <td className="border px-4 py-2"> <Check flag={a.flag_eyes} /> </td>
      <td className="border px-4 py-2"> <Check flag={a.flag_muscles} /> </td>
      <td className="border px-4 py-2"> <Check flag={a.flag_heart} /> </td>
      <td className="border px-4 py-2"> <Check flag={a.flag_line_noise} /> </td>
      <td className="border px-4 py-2"> <Check flag={a.flag_ch_noise} /> </td>
    </tr>
  );
  // const rows = []
  return (
    <React.Fragment>
      <AnnotationBar ic={props.ic} state="list"/>
      <div className="ml-6">
        <p className="text-4xl">ICs </p>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Brain</th>
              <th className="px-4 py-2">Eyes</th>
              <th className="px-4 py-2">Muscles</th>
              <th className="px-4 py-2">Heart</th>
              <th className="px-4 py-2">Line Noise</th>
              <th className="px-4 py-2">Channel Noise</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default AnnotationList;