import Check from '../common/Check';
import Link from '../common/Link';
import Spinner from '../common/Spinner';


function DatasetView (props) {
  const rows = props.ics.map((ic) =>
    <tr key={ic.id.toString()}>
      <td className="border px-4 py-2">{ic.subject}</td>
      <td className="border px-4 py-2"><a className="text-indigo-500" href={`/ic/${ic.id}/annotate`}>{ic.name}</a></td>
      <td className="border px-4 py-2">{ ic.is_annotated ? 'Yes' : ''}</td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_brain : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_mu : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_alpha : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_eyes : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_eyes_v : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_eyes_h : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_muscles : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_heart : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_line_noise : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_ch_noise : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_uncertain : false} /> </td>
      <td className="border px-4 py-2"> <Check flag={ic.annotation ? ic.annotation.flag_other : false} /> </td>
    </tr>
  );
  return (
    <div className="ml-6">
      <Link href="/datasets">Datasets</Link><span> / </span>
      <Link href={`/datasets/${props.dataset.id}`}>{props.dataset.full_name}</Link><span> / </span>
      <div className="mt-6 ml-6" hidden={!props.loading}>
        <Spinner/>
      </div>
      <table className="table-auto mt-6" hidden={props.loading}>
        <thead>
          <tr>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">IC Name</th>
            <th className="px-4 py-2">Is annotated</th>
            <th className="px-4 py-2">Brain</th>
            <th className="px-4 py-2">Mu</th>
            <th className="px-4 py-2">Alpha</th>
            <th className="px-4 py-2">Eyes</th>
            <th className="px-4 py-2">Eyes Vert</th>
            <th className="px-4 py-2">Eyes Hor</th>
            <th className="px-4 py-2">Muscles</th>
            <th className="px-4 py-2">Heart</th>
            <th className="px-4 py-2">Line Noise</th>
            <th className="px-4 py-2">Ch Noise</th>
            <th className="px-4 py-2">Uncert</th>
            <th className="px-4 py-2">Other</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default DatasetView;