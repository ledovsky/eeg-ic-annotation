function AnnotationBar (props) {
  return (
    <div className="mx-6 flex">
      <p className="text-indigo-500 hover:text-indigo-600">
        <a href="/datasets">Datasets</a><span> / </span>
        <a href={`/datasets/${props.ic.dataset}`}>Dataset 1</a><span> / </span>
        <a href={`/datasets/${props.ic.dataset}`}>Subject 1</a><span> / </span>
        <a href="">{props.ic.name}</a>
      </p>
      { props.state == 'annotation' ?
        <p className="text-indigo-500 hover:text-indigo-600 ml-6"><a href={`/ic/${props.ic.id}`}>Annotations</a></p> : ''
      }
      { props.state == 'list' ?
        <p className="text-indigo-500 hover:text-indigo-600 ml-6"><a href={`/ic/${props.ic.id}/annotate`}>Annotate</a></p> : ''
      }
      { props.ic.links && props.ic.links.prev ?
        <p className="text-indigo-500 hover:text-indigo-600 ml-6">
          <a href={`/ic/${props.ic.links.prev}${ props.state == 'annotation' ? '/annotate' : ''}`}>Previous</a></p> :
        ''
      }
      { props.ic.links && props.ic.links.next ?
        <p className="text-indigo-500 hover:text-indigo-600 ml-6">
          <a href={`/ic/${props.ic.links.next}${ props.state == 'annotation' ? '/annotate' : ''}`}>Next</a></p> :
        ''
      }
    </div>
  )
}

export default AnnotationBar;