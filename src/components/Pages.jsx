import React from 'react';

const Pages = ({ pages, handlePageClick }) => {
	return (
		<div className='pages'>
			{/* display every page number and set click handler to display corresponding comments from each page */}
			<div className='pages-list'>
				{pages.map(page => (
					<div onClick={() => handlePageClick(page)} key={page} className='page-number'>
						{page}
					</div>
				))}
			</div>
		</div>
	);
};

export default Pages;
