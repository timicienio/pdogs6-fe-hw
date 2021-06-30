import postsReducer from './postReducers';
import commentsReducer from './commentReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	posts: postsReducer,
	comments: commentsReducer,
});

export default rootReducer;
