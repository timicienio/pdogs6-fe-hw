import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { Col, Row, Button, ButtonGroup, Modal } from 'react-bootstrap';
import CommentList from '../components/CommentList';
import { useAppDispatch } from '../hooks/index';
import { ActionType } from '../state/action-types';

interface ParamTypes {
	id: string;
}

const Post = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const { id } = useParams<ParamTypes>();
	const { title, subtitle, body, author, timeAdded, comments } =
		useAppSelector(state => state.posts.byId![id]);
	const dispatch = useAppDispatch();

	const history = useHistory();
	const handleEditPost = () => {
		history.push('/edit-post/' + id);
	};
	const handleDeletePost = (id: string, commentIds: string[]) => {
		setShowConfirmDelete(false);
		dispatch({ type: ActionType.DELETE_POST, payload: { id, commentIds } });
		history.push('/post-list');
	};
	const handleClickDelete = () => {
		setShowConfirmDelete(true);
	};

	const renderParagraphs = (text: string) =>
		text.split('\n').map(para => <p>{para}</p>);

	return (
		<>
			<Modal
				show={showConfirmDelete}
				onClose={() => setShowConfirmDelete(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title> Confirm Deletion</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>Are you sure you want to delete this post?</p>
				</Modal.Body>

				<Modal.Footer>
					<Button variant='secondary'>Cancel</Button>
					<Button
						variant='danger'
						onClick={() => handleDeletePost(id, comments)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>

			<Col>
				<Row className='page-header'>
					<h1 className='page-header-title'>{title}</h1>
					<h2 className='post-list-item-subtitle'>{subtitle}</h2>
					<div>
						<span>Posted by </span>
						<span className='post-list-item-author-name'>
							{author}
						</span>
						<span> on </span>
						<span className='post-list-item-time'>{timeAdded}</span>
					</div>
				</Row>
				<Row>
					<div className='page-header-buttons'>
						<ButtonGroup>
							<Button
								variant='dark'
								className='post-edit'
								onClick={handleEditPost}
							>
								Edit Post
							</Button>
							<Button
								variant='danger'
								className='post-delete'
								onClick={handleClickDelete}
							>
								Delete Post
							</Button>
						</ButtonGroup>
					</div>
				</Row>
				<Row>
					<div className='post-body-container'>
						{renderParagraphs(body)}
					</div>
				</Row>
				<CommentList postId={id}></CommentList>
			</Col>
		</>
	);
};

export default Post;
