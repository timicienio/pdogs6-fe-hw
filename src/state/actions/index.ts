import {
	AddPostPayload,
	EditPostPayload,
	AddCommentPayload,
	EditCommentPayload,
} from '../../interfaces';
import { ActionType } from '../action-types/index';

interface AddPostAction {
	type: ActionType.ADD_POST;
	payload: AddPostPayload;
}

interface EditPostAction {
	type: ActionType.EDIT_POST;
	payload: EditPostPayload;
}

interface AddCommentAction {
	type: ActionType.ADD_COMMENT;
	payload: AddCommentPayload;
}

interface EditCommentAction {
	type: ActionType.EDIT_COMMENT;
	payload: EditCommentPayload;
}

export type Action =
	| AddPostAction
	| EditPostAction
	| AddCommentAction
	| EditCommentAction;
