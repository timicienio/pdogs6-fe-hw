import { combineReducers } from 'redux';
import {
	AddCommentPayload,
	CommentData,
	EditCommentPayload,
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

function addCommentId(state: string[], commentId: string) {
	return state.concat(commentId);
}

const commentsById = (
	state: { [id: string]: CommentData } = commentsByIdInitialState,
	action: Action
) => {
	switch (action.type) {
		case ActionType.ADD_COMMENT:
			return addCommentEntry(state, action.payload);
		case ActionType.EDIT_COMMENT:
			return editCommentEntry(state, action.payload);
		default:
			return state;
	}
};

const allComments = (
	state: string[] = allCommentIdInitialState,
	action: Action
) => {
	switch (action.type) {
		case ActionType.ADD_COMMENT:
			return addCommentId(state, action.payload.data.id);
		default:
			return state;
	}
};

const commentsReducer = combineReducers({
	byId: commentsById,
	allIds: allComments,
});

export default commentsReducer;
