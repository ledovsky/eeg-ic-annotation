const initialState = [];

export default function(state = initialState, action) {
  switch(action.type){
    case "DATASETS_LOAD":
      return action.payload;
    default:
      return state;
  }
}