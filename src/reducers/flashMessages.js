import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';
import {omit, findKey} from 'lodash';

export default (state = {}, action = {}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:

      const key = findKey(state, function(o) { return o.text === action.message.text; });

      let id = shortid.generate();
      const message = {...action.message, id: id}

      if(!key){
        return {...state, [id]: message };
        /*return [
          ...state,
          {
            id: shortid.generate(),
            type: action.message.type,
            text: action.message.text
          }
        ];*/
      }else{
        return state;
      }


    case DELETE_FLASH_MESSAGE:
      //const index = findIndex(state, { id: action.id });
      return omit(state, action.id);



    default: return state;
  }
}
