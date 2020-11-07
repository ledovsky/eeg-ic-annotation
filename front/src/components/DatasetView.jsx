function DatasetView (props) {
  const rows = props.ics.map((ic) =>
    <tr key={ic.id.toString()}>
      <td className="border px-4 py-2">{ic.subject}</td>
      <td className="border px-4 py-2"><a className="text-indigo-500" href={`/ic/${ic.id}/annotate`}>{ic.name}</a></td>
    </tr>
  );
  return (
    <div className="ml-6">
      <p className="text-4xl">ICs </p>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">IC Name</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default DatasetView