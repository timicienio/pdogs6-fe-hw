import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Dispatch } from 'redux';
import { PostData, CommentData } from '../../interfaces';

export const addPost = (data: PostData) => {
	return (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.ADD_POST,
			payload: { data },
		});
	};
};

export const editPost = (data: PostData) => {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionType.EDIT_POST, payload: { data } });
	};
};

export const deletePost = (id: string, commentIds: string[]) => {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionType.DELETE_POST, payload: { id, commentIds } });
	};
};

export const addComment = (postId: string, data: CommentData) => {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionType.ADD_COMMENT, payload: { postId, data } });
	};
};

export const editComment = (data: CommentData) => {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionType.EDIT_COMMENT, payload: { data } });
	};
};
