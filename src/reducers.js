import { combineReducers } from 'redux';
import dialogBoxReducer from './components/dialogWindow/reducer';

export default combineReducers({
  data: dialogBoxReducer
});
