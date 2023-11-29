import { useState, useEffect } from 'react';
import Comment from './components/Comment';
import Pages from './components/Pages';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
	// set total comments per page and initialize state for comments and pages
	const COMMENTS_PER_PAGE = 5;
	const [allComments, setAllComments] = useState([]);
	const [currentComments, setCurrentComments] = useState([]);
	const [pages, setPages] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	// retrieve the current comments to be displayed given a page number
	const getCurrentComments = pageNumber => {
		setCurrentPage(pageNumber);
		const startIndex = (pageNumber - 1) * COMMENTS_PER_PAGE;
		const endIndex = pageNumber * COMMENTS_PER_PAGE;
		const currentCommentsArr = allComments.slice(startIndex, endIndex);
		setCurrentComments(currentCommentsArr);
	};

	// store all the page numbers in state
	const getPages = () => {
		const totalPages = Math.ceil(allComments.length / COMMENTS_PER_PAGE);
		const pagesArr = [];
		for (let i = 1; i <= totalPages; i++) {
			pagesArr.push(i);
		}
		setPages(pagesArr);
	};

	useEffect(() => {
		// retrieve all comments when the page loads
		const getComments = async () => {
			try {
				const jsonData = await fetch('comments.json');
				const res = await jsonData.json();
				let comments = res.comments;

				for (let comment of comments) {
					comment['replies'] = [];
				}

				setAllComments(comments);
			} catch (err) {
				console.log(err);
			}
		};
		getComments();
	}, []);

	useEffect(() => {
		getPages();
		getCurrentComments(currentPage);
	}, [allComments]);

	return (
		<div className='container'>
			<h1>Comments</h1>
			<div className='comment-section'>
				{/* map through the current comments array and display every comment in the current page  */}
				{currentComments.map(comment => (
					<Comment key={uuidv4()} id={comment.id} comment={comment} allComments={allComments} setAllComments={setAllComments} />
				))}

				{/* display each page number */}
				<Pages pages={pages} handlePageClick={getCurrentComments} />
			</div>
		</div>
	);
};

export default App;
