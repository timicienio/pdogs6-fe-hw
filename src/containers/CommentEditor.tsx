import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { CommentEditorState as Props } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ActionType } from '../state/action-types';
import { nanoid } from 'nanoid';

interface FormFields {
	body: string;
	author: string;
}

interface FormErrors {
	body: string;
	author: string;
}

const CommentEditor = ({ postId }: Props) => {
	const [display, setDisplay] = useState(false);
	const [fields, setFields] = useState<FormFields>({
		body: '',
		author: '',
	});
	const [errors, setErrors] = useState<FormErrors>({
		body: '',
		author: '',
	});

	const dispatch = useAppDispatch();

	const validate = ({ body, author }: FormFields) => {
		let errors: FormErrors = {
			body: '',
			author: '',
		};
		let valid = true;

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
				const id: string = nanoid();
				const { body, author } = fields;

				dispatch({
					type: ActionType.ADD_COMMENT,
					payload: {
						postId: postId,
						data: {
							id: id,
							body: body,
							author: author,
						},
					},
				});

				setFields({
					body: '',
					author: '',
				});

				setDisplay(false);
			}
		},
		[dispatch]
	);

	return (
		<>
			{display ? (
				<Card className='comment-editor'>
					<Form noValidate>
						<Form.Group controlId='editPostAuthor'>
							<Form.Control
								placeholder='Enter your name'
								value={fields.author}
								onChange={e =>
									setFields({
										...fields,
										author: e.target.value,
									})
								}
								isInvalid={errors.author !== ''}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.author}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId='editPostBody'>
							<Form.Control
								placeholder='Enter content'
								value={fields.body}
								onChange={e =>
									setFields({
										...fields,
										body: e.target.value,
									})
								}
								as='textarea'
								rows={3}
								isInvalid={errors.body !== ''}
							/>

							<Form.Control.Feedback type='invalid'>
								{errors.body}
							</Form.Control.Feedback>
						</Form.Group>

						<Button
							variant='primary'
							onClick={() => handleSubmit(fields)}
						>
							Submit
						</Button>
					</Form>
				</Card>
			) : (
				<Button onClick={() => setDisplay(true)}>Add Comment</Button>
			)}
		</>
	);
};

export default CommentEditor;
