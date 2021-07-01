// Redux Data

export interface CommentData {
	id: string;
	author: String;
	body: String;
}

export interface PostData {
	id: string;
	title: string;
	subtitle: string;
	author: string;
	timeAdded: string;
	body: string;
	comments: string[];
}

// Redux normalized objects

export interface NormalizedObjects<T> {
	byId: { [id: string]: T };
	allIds: string[];
}

// Redux action payload

export interface AddPostPayload {
	data: PostData;
}

export interface EditPostPayload {
	data: PostData;
}

export interface DeletePostPayload {
	id: string;
	commentIds: string[];
}

export interface AddCommentPayload {
	postId: string;
	data: CommentData;
}

export interface EditCommentPayload {
	data: CommentData;
}

export interface DeleteCommentPayload {
	id: string;
}

// database

export interface BaseRecord {
	id: string;
}

// States / Props

export interface PostListState {}
export interface PostListItemState {
	postId: string;
}

export interface CommentListState {
	postId: string;
}

export interface CommentListItemState {
	commentId: string;
}

export interface PostEditorState {}

export interface CommentEditorState {
	postId: string;
}
