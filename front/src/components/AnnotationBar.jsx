function AnnotationBar (props) {
  return (
    <div className="mx-6 flex">
      <p className="text-indigo-500 hover:text-indigo-600">
        <a href={`/datasets/${props.ic.dataset}`}>Dataset 1</a> / <a href={`/datasets/${props.ic.dataset}`}>Subject 1</a>
      </p>
      { props.state == 'annotation' ?
        <p className="text-indigo-500 hover:text-indigo-600 ml-6"><a href={`/ic/${props.ic.id}`}>Annotations</a></p> : ''
      }
      { props.state == 'list' ?
        <p className="text-indigo-500 hover:text-indigo-600 ml-6"><a href={`/ic/${props.ic.id}/annotate`}>Annotate</a></p> : ''
      }
      <p className="text-indigo-500 hover:text-indigo-600 ml-6"><a href="">Next</a></p>
      <p className="text-indigo-500 hover:text-indigo-600 ml-6"><a href="">Previous</a></p>
    </div>
  )
}

export default AnnotationBar;