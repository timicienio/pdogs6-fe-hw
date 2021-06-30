import * as React from 'react';
import { InputGroup } from 'react-bootstrap';
import { PostEditorState as Props } from '../interfaces';
import { useParams } from 'react-router';
const PostEditor = ({}: Props) => {
	const postId: string = useParams();

	return <></>;
};

export default PostEditor;
