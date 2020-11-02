import { useParams, useHistory } from 'react-router-dom'

function DatasetView(props) {
  const { dataset_name } = useParams()
  return (
    <div>DatasetView {dataset_name}</div>
  )
}

export default DatasetView;