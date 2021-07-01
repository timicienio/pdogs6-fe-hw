import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { PostData, PostEditorState as Props } from '../interfaces';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ActionType } from '../state/action-types';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';

interface FormFields {
	title: string;
	subtitle: string;
	body: string;
	author: string;
}
interface FormErrors {
	title: string;
	body: string;
	author: string;
}

const PostEditor = ({}: Props) => {
	const history = useHistory();
	const { postId } = useParams<{ postId: string }>();
	const [fields, setFields] = useState<FormFields>({
		title: '',
		subtitle: '',
		body: '',
		author: '',
	});
	const [errors, setErrors] = useState<FormErrors>({
		title: '',
		body: '',
		author: '',
	});

	const oriContent: PostData = useAppSelector(
		state => state.posts.byId[postId]
	);

	useEffect(() => {
		if (oriContent) {
			setFields({
				title: oriContent.title,
				subtitle: oriContent.subtitle,
				body: oriContent.body,
				author: oriContent.author,
			});
		}
	}, []);

	const dispatch = useAppDispatch();

	const validate = ({ title, body, author }: FormFields) => {
		let errors: FormErrors = {
			title: '',
			body: '',
			author: '',
		};
		let valid = true;

		if (title === '') {
			console.log('no title!');
			valid = false;
			errors['title'] = 'Please enter title!';
		} else {
			errors['title'] = '';
		}

		if (!body) {
			valid = false;
			errors['body'] = 'Please enter some beautiful words!';
		} else {
			errors['body'] = '';
		}
		if (!author) {
			valid = false;
			errors['author'] = 'Please enter you beautiful name!';
		} else {
			errors['author'] = '';
		}
		console.log(errors);
		setErrors(errors);
		return valid;
	};

	const handleSubmit = useCallback(
		(fields: FormFields) => {
			if (validate(fields)) {
				const id: string = oriContent ? oriContent.id : nanoid();
				const timeAdded: string = oriContent
					? oriContent.timeAdded
					: new Date().toDateString();
				const comments: string[] = oriContent
					? oriContent.comments
					: [];
				const { title, subtitle, body, author } = fields;

				dispatch({
					type: oriContent
						? ActionType.EDIT_POST
						: ActionType.ADD_POST,
					payload: {
						data: {
							id: id,
							title: title,
							subtitle: subtitle,
							body: body,
							author: author,
							timeAdded: timeAdded,
							comments: comments,
						},
					},
				});
				history.push('/post-list');
			}
		},
		[dispatch]
	);

	return (
		<Col>
			<Row className='page-header'>
				{postId === 'new' ? (
					<h1 className='page-header-title'>Add Post</h1>
				) : (
					<h1 className='page-header-title'>
						Edit Post<span>"{oriContent.title}"</span>
					</h1>
				)}
			</Row>

			<Row>
				<Form noValidate>
					<Form.Group controlId='editPostTitle'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							// type='email'
							placeholder='Enter title'
							value={fields.title}
							onChange={e =>
								setFields({ ...fields, title: e.target.value })
							}
							isInvalid={errors.title !== ''}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.title}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId='editPostSubtitle'>
						<Form.Label>Subtitle</Form.Label>
						<Form.Control
							placeholder='Enter subtitle'
							value={fields.subtitle}
							onChange={e =>
								setFields({
									...fields,
									subtitle: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group controlId='editPostBody'>
						<Form.Label>Content</Form.Label>
						<Form.Control
							placeholder='Enter content'
							value={fields.body}
							onChange={e =>
								setFields({ ...fields, body: e.target.value })
							}
							as='textarea'
							rows={7}
							isInvalid={errors.body !== ''}
						/>

						<Form.Control.Feedback type='invalid'>
							{errors.body}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId='editPostAuthor'>
						<Form.Label>Author</Form.Label>
						<Form.Control
							placeholder='Enter your name'
							value={fields.author}
							onChange={e =>
								setFields({ ...fields, author: e.target.value })
							}
							isInvalid={errors.author !== ''}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.author}
						</Form.Control.Feedback>
					</Form.Group>

					<Button
						variant='primary'
						onClick={() => handleSubmit(fields)}
					>
						Submit
					</Button>
				</Form>
			</Row>
		</Col>
	);
};

export default PostEditor;
