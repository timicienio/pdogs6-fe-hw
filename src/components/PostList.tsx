import PostListItem from './PostListItem';
import { Button, Col, Row } from 'react-bootstrap';
import { PostListState as Props } from '../interfaces';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../hooks/index';

const PostList = ({}: Props): JSX.Element => {
	const history = useHistory();
	const postIds: string[] = useAppSelector(state => state.posts.allIds);

	return (
		<Col>
			<Row className='page-header'>
				<h1 className='page-header-title'>Posts</h1>
			</Row>
			<Row>
				<div className='post-list-header-buttons'>
					<Button
						variant='secondary'
						className='post-list-add'
						onClick={() => history.push('/edit-post/new')}
					>
						+ Add Post
					</Button>
				</div>
			</Row>
			<Row className='post-list-body'>
				<ul className='post-list'>
					{postIds.map(id => (
						<PostListItem postId={id} />
					))}
				</ul>
			</Row>
		</Col>
	);
};

export default PostList;
