import React from 'react'
import styled from 'styled-components';
import "./Pagination.css";



export const Pagination = ({ totalRecipes, recipePerPage, currentPage, setCurrentPage }) => {
    let pages = [];
    for (let i = 0; i < Math.ceil(totalRecipes / recipePerPage); i++) {
        pages.push(i+1);
        console.log(pages);
    }

    window.scrollTo({top: 0,
        behavior: 'smooth'});

    return (
        <div className='pagination'>
            {pages.map((page, index) => {
               return <button key={index} onClick={() => 
               setCurrentPage(page)} className={page == currentPage ? "active" : ""}>
                {page}</button>
            })}
            
        </div>
    )
}
