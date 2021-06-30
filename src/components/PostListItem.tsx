import React from 'react';
import { PostData } from '../interfaces';
import { PostListItemState as Props } from '../interfaces';
import { useAppSelector } from '../hooks/index';
import { useHistory } from 'react-router';

const PostListItem = ({ postId }: Props) => {
	const { title, subtitle, timeAdded, author }: PostData = useAppSelector(
		state => state.posts.byId![postId]
	);
	const history = useHistory();
	const onClick = () => {
		history.push('./post/' + postId);
	};

	return (
		<li id={postId} className='post-list-item'>
			<hr></hr>
			<div className='post-list-item-container' onClick={onClick}>
				<h1 className='post-list-item-title'>{title}</h1>
				<h2 className='post-list-item-subtitle'>{subtitle}</h2>
				<span>Posted by </span>
				<span className='post-list-item-author-name'>{author}</span>
				<span> on </span>
				<span className='post-list-item-time'>{timeAdded}</span>
			</div>
		</li>
	);
};

export default PostListItem;
