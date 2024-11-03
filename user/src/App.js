import React, { useEffect, useState } from "react";
import FoodOrder from "./FoodOrder";
import FoodList from "./FoodList";
import axios from "axios";
function App() {
  const [foodItemList, setFoodItemList] = useState([]);

  const fetchFoodListData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/food/getFood`
      );
      if (response) {
        const {
          data: { data },
        } = response;
        setFoodItemList(data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchFoodListData();
  }, []);
  return (
    <div className="container mt-2">
      <center>
        <h1 className="mb-4">Food shop</h1>
      </center>
      <div className="d-flex gap-0 mb-5">
        <FoodList foodItemList={foodItemList} />
        <FoodOrder foodItemList={foodItemList} />
      </div>
    </div>
  );
}

export default App;
