import { stat } from 'fs';
import { act } from 'react-dom/test-utils';
import { combineReducers } from 'redux';
import {
	AddPostPayload,
	EditPostPayload,
	DeletePostPayload,
	AddCommentPayload,
	PostData,
} from '../../interfaces';
import { deletePost } from '../action-creators';
import { ActionType } from '../action-types';
import { Action } from '../actions/index';

const postsByIdInitialState: { [id: string]: PostData } = {
	'0': {
		id: '0',
		title: 'We love PDOGS!',
		subtitle: 'And they love us, too!',
		author: 'RDOGS',
		body: "There are two main ways to initialize state for your application. \nThe createStore method can accept an optional preloadedState value as its second argument. Reducers can also specify an initial value by looking for an incoming state argument that is undefined, and returning the value they'd like to use as a default. \nThis can either be done with an explicit check inside the reducer, or by using the ES6 default argument value syntax: function myReducer(state = someDefaultValue, action).\nIt's not always immediately clear how these two approaches interact. Fortunately, the process does follow some predictable rules. Here's how the pieces fit together.",
		comments: ['0'],
		timeAdded: 'Jan 01 2021',
	},
	'1': {
		id: '1',
		title: 'We love RDOGS!',
		subtitle: 'And they love us, too!',
		author: 'PDOGS',
		body: "Now I specified the preloadedState as the argument to createStore(). The state returned from the combined reducer combines the initial state I specified for the a reducer with the 'wat' default argument specified that b reducer chose itself.",
		comments: ['1', '2'],
		timeAdded: 'Dec 31 2020',
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

function deletePostEntry(
	state: { [id: string]: PostData },
	payload: DeletePostPayload
) {
	const { id } = payload;

	return Object.keys(state)
		.filter(key => state[key].id !== id)
		.reduce((newState: { [id: string]: PostData }, key: string) => {
			newState[key] = state[key];
			return newState;
		}, {});
}

function addComment(
	state: { [id: string]: PostData },
	payload: AddCommentPayload
) {
	const { postId, data } = payload;

	const post = state[postId];

	return {
		...state,
		[postId]: {
			...post,
			comments: post.comments.concat(data.id),
		},
	};
}

const addPostId = (state: string[], postId: string) => {
	return [...state, postId];
};

const deletePostId = (state: string[], postId: string) => {
	return state.filter(item => item !== postId);
};

const postsById = (
	state: { [id: string]: PostData } = postsByIdInitialState,
	action: Action
) => {
	// console.log(action.type);
	switch (action.type) {
		case ActionType.ADD_POST: {
			// console.log(state);
			return addPostEntry(state, action.payload);
		}
		case ActionType.EDIT_POST:
			return editPostEntry(state, action.payload);
		case ActionType.DELETE_POST:
			return deletePostEntry(state, action.payload);
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
		case ActionType.DELETE_POST:
			return deletePostId(state, action.payload.id);
		default:
			return state;
	}
};

const postReducer = combineReducers({ byId: postsById, allIds: allPosts });

export default postReducer;
