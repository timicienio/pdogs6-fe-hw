import React, { useState } from 'react';
import PostListItem from '../components/PostListItem';
import { Button } from '@material-ui/core';
import { PostListState as Props } from '../interfaces';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from '../hooks/index';

const PostList = ({}: Props): JSX.Element => {
	const postIds: string[] | undefined = useAppSelector(
		state => state.posts.allIds
	);
	const [addPostClicked, setAddPostClicked] = useState(false);
	return (
		<>
			{!addPostClicked ? (
				<div className='post-list'>
					<Button
						className='post-list-add'
						onClick={() => setAddPostClicked(true)}
					>
						Add Post
					</Button>

					<ul className='post-list-body'>
						{postIds ? (
							postIds.map(id => (
								<PostListItem postId={id}></PostListItem>
							))
						) : (
							<></>
						)}
					</ul>
				</div>
			) : (
				<Redirect to='/edit-post/new'></Redirect>
			)}
		</>
	);
};

export default PostList;
