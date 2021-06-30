import React from 'react';
import { PostData } from '../interfaces';
import { PostListItemState as Props } from '../interfaces';
import { useAppSelector } from '../hooks/index';

const PostListItem = ({ postId }: Props) => {
	const { title, subtitle, timeAdded, author }: PostData = useAppSelector(
		state => state.posts.byId![postId]
	);

	return (
		<li id={postId} className='post-list-item'>
			<div>
				<h1>{title}</h1>
				<h2>{subtitle}</h2>
				<p>
					Posted by <span className='author-name'>{author}</span>
					on {timeAdded}
				</p>
			</div>
		</li>
	);
};

export default PostListItem;
