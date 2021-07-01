import React, { useState } from 'react';
import CommentListItem from './CommentListItem';
import { CommentListState as Props, PostData } from '../interfaces';
import { useAppSelector } from '../hooks';
import { Row, Card } from 'react-bootstrap';
import CommentEditor from '../containers/CommentEditor';

const CommentList = ({ postId }: Props) => {
	const { comments }: PostData = useAppSelector(
		state => state.posts.byId[postId]
	);

	const renderComments = (comments: string[]) => {
		return comments.length === 0 ? (
			<Card className='comment-list-item'>
				<Card.Body>
					<Card.Text>No comments yet...</Card.Text>
				</Card.Body>
			</Card>
		) : (
			comments.map(id => <CommentListItem commentId={id} />)
		);
	};

	return (
		<>
			<h1 className='comment-list-title'>Comments</h1>

			<Row>
				<div className='comment-list-container'>
					<ul className='comment-list'>{renderComments(comments)}</ul>
				</div>
			</Row>
			<Row>
				<div>
					<CommentEditor postId={postId} />
				</div>
			</Row>
		</>
	);
};

export default CommentList;
