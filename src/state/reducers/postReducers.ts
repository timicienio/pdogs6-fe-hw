import { combineReducers } from 'redux';
import {
	AddPostPayload,
	EditPostPayload,
	AddCommentPayload,
	PostData,
} from '../../interfaces';
import { ActionType } from '../action-types';
import { Action } from '../actions/index';

const postsByIdInitialState: { [id: string]: PostData } = {
	'0': {
		id: '0',
		title: 'We love PDOGS!',
		subtitle: 'And they love us, too!',
		author: 'RDOGS',
		body: "There are two main ways to initialize state for your application. The createStore method can accept an optional preloadedState value as its second argument. Reducers can also specify an initial value by looking for an incoming state argument that is undefined, and returning the value they'd like to use as a default. This can either be done with an explicit check inside the reducer, or by using the ES6 default argument value syntax: function myReducer(state = someDefaultValue, action).It's not always immediately clear how these two approaches interact. Fortunately, the process does follow some predictable rules. Here's how the pieces fit together.",
		comments: ['0'],
		timeAdded: '2021-01-01',
	},
	'1': {
		id: '1',
		title: 'We love RDOGS!',
		subtitle: 'And they love us, too!',
		author: 'PDOGS',
		body: "Now I specified the preloadedState as the argument to createStore(). The state returned from the combined reducer combines the initial state I specified for the a reducer with the 'wat' default argument specified that b reducer chose itself.",
		comments: ['1', '2'],
		timeAdded: '2020-12-31',
	},
};

const allPostIdInitialState: string[] = ['0', '1'];

function addPostEntry(
	state: { [id: string]: PostData },
	payload: AddPostPayload
) {
	const { data } = payload;

	return {
		...state,
		[data.id]: data,
	};
}

function editPostEntry(
	state: { [id: string]: PostData },
	payload: EditPostPayload
) {
	const { data } = payload;

	return {
		...state,
		[data.id]: data,
	};
}

function addComment(
	state: { [id: string]: PostData },
	payload: AddCommentPayload
) {
	const { postId, data } = payload;

	// Look up the correct post, to simplify the rest of the code
	const post = state[postId];

	return {
		...state,
		// Update our Post object with a new "comments" array
		[postId]: {
			...post,
			comments: post.comments.concat(data.id),
		},
	};
}

const addPostId = (state: string[], postId: string) => {
	return state.concat(postId);
};

const postsById = (
	state: { [id: string]: PostData } = postsByIdInitialState,
	action: Action
) => {
	switch (action.type) {
		case ActionType.ADD_POST:
			return addPostEntry(state, action.payload);
		case ActionType.EDIT_POST:
			return editPostEntry(state, action.payload);
		case ActionType.ADD_COMMENT:
			return addComment(state, action.payload);
		default:
			return state;
	}
};

const allPosts = (state: string[] = allPostIdInitialState, action: Action) => {
	switch (action.type) {
		case ActionType.ADD_POST:
			return addPostId(state, action.payload.data.id);
		default:
			return state;
	}
};

const postReducer = combineReducers({ byId: postsById, allIds: allPosts });

export default postReducer;
