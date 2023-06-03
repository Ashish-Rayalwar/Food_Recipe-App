import react, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import RecipeComponent from "./RecipeComponent";
import SearchIcon from "@mui/icons-material/Search";
import LOGO from "./images/logo.png";
const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";
// const APP_ID = process.env.APP_ID;
// const APP_KEY = process.env.APP_KEY;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: #060101;
  /* background: url("./images/food.jpg") no-repeat center center; */
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  height: 80px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
// const SearchIcon = styled.img`
//   width: 32px;
//   height: 32px;
// `;
const RecipeImage = styled.img`
  width: 166px;
  height: 166px;
  /* margin: 15px; */
  color: white;
`;
const Placeholder = styled.img`
  width: 420px;
  height: 420px;
  /* margin: 200px; */
  opacity: 50%;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
  height: 60vh;
`;

const Text = styled.div`
  font-family: cursive;
`;
const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
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
      <Header>
        <AppName>
          <RecipeImage src={LOGO} />
          <Text>Recipe Finder</Text>
        </AppName>
        <SearchBox>
          <SearchIcon style={{ color: "grey", cursor: "pointer" }} />
          <SearchInput
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src={LOGO} />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default AppComponent;
