import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Comment = ({ id, comment, allComments, setAllComments }) => {
	const { author, text, date, likes, image, replies } = comment;
	const [editMode, setEditMode] = useState(false);
	const [replyMode, setReplyMode] = useState(false);
	const [inputText, setInputText] = useState('');

	const findIndex = () => {
		for (let i = 0; i < allComments.length; i++) {
			if (id === allComments[i].id) {
				return i;
			}
		}
	};

	// increment likes by 1 when like button is clicked
	const handleLikesClick = () => {
		const index = findIndex();
		const newComment = comment;
		newComment.likes = likes + 1;
		setAllComments([...allComments.slice(0, index), newComment, ...allComments.slice(index + 1)]);
	};

	// allow user to start replying to a comment by displaying a text input field
	const handleReplyClick = () => {
		setReplyMode(true);
	};

	// send a reply with the reply text, admin as the user, and the current time
	const handleSendReplyClick = () => {
		if (inputText !== '') {
			const index = findIndex();
			const newComment = comment;
			const reply = {
				username: 'Admin',
				text: inputText,
				time: new Date().toLocaleString()
			};
			newComment.replies.push(reply);
			setAllComments([...allComments.slice(0, index), newComment, ...allComments.slice(index + 1)]);
			setInputText('');
		}
		setReplyMode(false);
	};

	// allow user to start editing comment by displaying a text input field
	const handleEditClick = () => {
		setEditMode(true);
	};

	// save newly edited comment by updating TextState
	const handleSaveClick = () => {
		const index = findIndex();
		const newComment = comment;
		if (inputText !== '') {
			newComment.text = inputText;
			setAllComments([...allComments.slice(0, index), newComment, ...allComments.slice(index + 1)]);
		}
		setEditMode(false);
	};

	// delete comment
	const handleDeleteClick = () => {
		const index = findIndex();

		if (index === 0) {
			setAllComments(allComments.slice(index + 1));
		} else {
			setAllComments([...allComments.slice(0, index), ...allComments.slice(index + 1)]);
		}
	};

	// set the state of the input text
	const handleInputChange = e => {
		setInputText(e.target.value);
	};

	return (
		<div className='comment'>
			{/* render comment */}
			<div>
				<h3 className='comment-author'>{author}</h3>
				<p className='comment-date'>Posted on {date}</p>
				{/* render input text fields when editing or replying */}
				{editMode ? <textarea defaultValue={text} onChange={e => handleInputChange(e)} /> : text}
				{replyMode ? <textarea onChange={e => handleInputChange(e)} /> : null}

				{/* render an image if the comment has one */}
				<div className='image-container'>{image.length > 0 && <img src={image} className='comment-image' />}</div>

				{/* render like button, correct buttons for editing or replying, and delete button */}
				<div className='comment-actions'>
					<div className='left-actions'>
						{
							<button onClick={handleLikesClick} className='like-btn'>
								{likes}
							</button>
						}

						{replyMode ? (
							<button onClick={handleSendReplyClick} className='send-reply-btn'>
								Send Reply
							</button>
						) : (
							<button onClick={handleReplyClick} className='reply-btn'>
								Reply
							</button>
						)}
					</div>

					<div className='right-actions'>
						{editMode ? (
							<button onClick={handleSaveClick} className='save-btn'>
								Save
							</button>
						) : (
							<button onClick={handleEditClick} className='edit-btn'>
								Edit
							</button>
						)}

						{
							<button onClick={handleDeleteClick} className='delete-btn'>
								Delete
							</button>
						}
					</div>
				</div>
			</div>

			{/* render all replies */}
			{replies.length > 0 && (
				<div className='reply-section'>
					{replies.map(({ username, text, time }) => (
						<div key={uuidv4()} className='reply-card'>
							<div className='reply-header'>
								<h5 className='reply-username'>{username}</h5>
								<p className='comment-date reply-date'>{time}</p>
							</div>
							<p className='reply-text'>{text}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Comment;
