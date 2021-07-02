import { combineReducers } from 'redux';
import {
	AddCommentPayload,
	CommentData,
	EditCommentPayload,
	DeleteCommentPayload,
} from '../../interfaces';
import { ActionType } from '../action-types';
import { Action } from '../actions/index';

const commentsByIdInitialState: { [id: string]: CommentData } = {
	'0': {
		id: '0',
		author: 'fredred',
		body: "Nope we don't",
	},
	'1': {
		id: '1',
		author: 'gary',
		body: 'huh',
	},
	'2': {
		id: '2',
		author: 'timicienio',
		body: 'lmao',
	},
};

const allCommentIdInitialState: string[] = ['0', '1', '2'];

function addCommentEntry(
	state: { [id: string]: CommentData },
	payload: AddCommentPayload
) {
	const { data } = payload;
	return {
		...state,
		[data.id]: data,
	};
}

function editCommentEntry(
	state: { [id: string]: CommentData },
	payload: EditCommentPayload
) {
	const { data } = payload;
	return {
		...state,
		[data.id]: data,
	};
}

function deleteCommentEntry(
	state: { [id: string]: CommentData },
	payload: DeleteCommentPayload
) {
	const { id } = payload;

	return Object.keys(state)
		.filter(key => state[key].id !== id)
		.reduce((newState: { [id: string]: CommentData }, key: string) => {
			newState[key] = state[key];
			return newState;
		}, {});
}

const deleteAllCommentsEntriesInPost = (
	state: { [id: string]: CommentData },
	comments: string[]
) => {
	return Object.keys(state)
		.filter(key => !comments.includes(state[key].id))
		.reduce((newState: { [id: string]: CommentData }, key: string) => {
			newState[key] = state[key];
			return newState;
		}, {});
};

const commentsById = (
	state: { [id: string]: CommentData } = commentsByIdInitialState,
	action: Action
) => {
	switch (action.type) {
		case ActionType.ADD_COMMENT:
			return addCommentEntry(state, action.payload);
		case ActionType.EDIT_COMMENT:
			return editCommentEntry(state, action.payload);
		case ActionType.DELETE_POST:
			return deleteAllCommentsEntriesInPost(
				state,
				action.payload.commentIds
			);
		default:
			return state;
	}
};

function addCommentId(state: string[], commentId: string) {
	return state.concat(commentId);
}

const deleteCommentId = (state: string[], commentId: string) => {
	return state.filter(item => item !== commentId);
};

const deleteAllCommentsIdsInPost = (state: string[], comments: string[]) => {
	return state.filter(item => !comments.includes(item));
};

const allComments = (
	state: string[] = allCommentIdInitialState,
	action: Action
) => {
	switch (action.type) {
		case ActionType.ADD_COMMENT:
			return addCommentId(state, action.payload.data.id);
		case ActionType.DELETE_POST:
			return deleteAllCommentsIdsInPost(state, action.payload.commentIds);
		default:
			return state;
	}
};

const commentsReducer = combineReducers({
	byId: commentsById,
	allIds: allComments,
});

export default commentsReducer;
