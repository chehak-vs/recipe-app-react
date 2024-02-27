import {React, useState, useEffect} from "react";
import styled from "styled-components";
import { HeaderSection } from "./components/Headersection";
import { RecipeCard } from "./components/RecipeCard";
import {Placeholder} from "./components/Placeholder";
import Axios, * as others  from "axios";
import { Pagination } from "./components/Pagination";


const APP_ID = "6ba04881";
const APP_KEY = "e52135ec23c12c0a7c69ee655ce1b01c";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [slicedRecipeList, setSlicedRecipeList] = useState([]);
  const recipePerPage = 5;

  let lastIndex = currentPage * recipePerPage;
  let firstIndex = lastIndex - recipePerPage;

  useEffect(() => {
    setSlicedRecipeList(recipeList.slice(firstIndex, lastIndex));
  }, [recipeList, firstIndex, lastIndex]);

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    console.log(response.data.hits);
    updateRecipeList(response.data.hits);
    // console.log(recipePerPage)
    // console.log(recipeList.length);
    // console.log(firstIndex);
    // console.log(lastIndex);
    // setSlicedRecipeList(recipeList.slice(firstIndex, lastIndex));
    // console.log(slicedRecipeList);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <HeaderSection onTextChange={onTextChange} searchQuery={searchQuery} />
      {recipeList.length ? (
          slicedRecipeList.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe.recipe} totalRecipes={recipeList.length} recipePerPage={recipePerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            
          ))
        ) : (
          <Placeholder src="/images/hamburger.svg" />
        )}
    <Pagination totalRecipes={recipeList.length} recipePerPage = {recipePerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />    
    </Container>
  );
}

export default App;
