import {React, useState} from "react";
import styled from "styled-components";
import { HeaderSection } from "./components/Headersection";
import { RecipeCard } from "./components/RecipeCard";
import {Placeholder} from "./components/Placeholder";
import Axios, * as others  from "axios";

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
      <HeaderSection onTextChange={onTextChange} searchQuery={searchQuery} />
      {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="/images/hamburger.svg" />
        )}
    </Container>
  );
}

export default App;
