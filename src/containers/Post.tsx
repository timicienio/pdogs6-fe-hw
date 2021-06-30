import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';

interface ParamTypes {
	id: string;
}

const Post = () => {
	const { id } = useParams<ParamTypes>();
	const { title, subtitle, body, author, timeAdded } = useAppSelector(
		state => state.posts.byId![id]
	);

	const renderParagraphs = (text: string) =>
		text.split('\n').map(para => <p>{para}</p>);

	return (
		<>
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
								className='post-list-add'
								onClick={() => {}}
							>
								Edit Post
							</Button>
							<Button
								variant='danger'
								className='post-list-add'
								onClick={() => {}}
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
			</Col>
		</>
	);
};

export default Post;
