import store from '../store'
import Api from '../api'


export async function loadDatasets(){
  console.log("loadDatasets action");

  let collection = await Api.getList('view/datasets/list', {})
    store.dispatch({
      type: "DATASETS_LOAD",
      payload: collection
    })
  return;
}