import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../hooks';
import { CommentListItemState as Props, CommentData } from '../interfaces';
import { Card } from 'react-bootstrap';
const CommentListItem = ({ commentId }: Props) => {
	const { author, body }: CommentData = useAppSelector(
		state => state.comments.byId[commentId]
	);
	return (
		<li id={commentId}>
			<Card className='comment-list-item'>
				<Card.Body>
					<Card.Title>{author}</Card.Title>
					{/* <Card.Subtitle className='mb-2 text-muted'>
					Card Subtitle
				</Card.Subtitle> */}
					<Card.Text>{body}</Card.Text>
				</Card.Body>
			</Card>
		</li>
	);
};

export default CommentListItem;
