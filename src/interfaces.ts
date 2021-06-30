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

export interface AddCommentPayload {
	postId: string;
	data: CommentData;
}

export interface EditCommentPayload {
	data: CommentData;
}

// database

export interface BaseRecord {
	id: string;
}

// States / Props

export interface PostListItemState {
	postId: string;
}

export interface PostListState {}

export interface PostEditorState {}
