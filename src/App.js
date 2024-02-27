import React, {useState, useEffect, Suspense} from "react";
import styled from "styled-components";
import Axios, * as others  from "axios";
import { Pagination } from "./components/Pagination";

const LazyPlaceholder = React.lazy(() => import("./components/Placeholder"));
const LazyRecipeCard = React.lazy(() => import("./components/RecipeCard"));
const LazyHeaderSection = React.lazy(() => import("./components/Headersection"))



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
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Suspense fallback="Loading...">
      <LazyHeaderSection onTextChange={onTextChange} searchQuery={searchQuery} />
      </Suspense>
      {recipeList.length ? (
          slicedRecipeList.map((recipe, index) => (
            <Suspense fallback="Loading...">
            <LazyRecipeCard key={index} recipe={recipe.recipe} totalRecipes={recipeList.length} recipePerPage={recipePerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </Suspense>
            
          ))
        ) : (
          <Suspense fallback="Loading...">
            <LazyPlaceholder src="/images/hamburger.svg" />
          </Suspense>
          
        )}
    <Pagination totalRecipes={recipeList.length} recipePerPage = {recipePerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />    
    </Container>
  );
}

export default App;
