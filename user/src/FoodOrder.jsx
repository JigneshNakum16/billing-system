import axios from "axios";
import React, { useState } from "react";
import OrderBill from "./OrderBill";

function FoodOrder({ foodItemList }) {
  const [foodData, setFoodData] = useState({
    name: "",
    phone: "",
    foodId: "",
    foodQuantity: 1,
  });
  const [foodList, setFoodList] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [response, setResponse] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const getFoodItem = (foodId) => {
    const foodItem = foodItemList.find((item) => item?._id === foodId);
    return foodItem ? foodItem : " Not found";
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const foodItem = getFoodItem(foodData?.foodId);
    const newFood = {
      foodName: foodItem?.foodName,
      quantity: parseInt(foodData?.foodQuantity),
      price: foodItem?.price,
    };
    const orderItem = {
      foodId: foodData?.foodId,
      price: foodItem?.price,
      quantity: parseInt(foodData?.foodQuantity),
    };
    setFoodList([...foodList, newFood]);
    setOrderItems([...orderItems, orderItem]);
    // Reset the form
    setFoodData({
      name: foodData?.name,
      phone: foodData?.phone,
      foodId: "",
      foodQuantity: 1,
    });
  };
  const handleCancel = () => {
    // Logic for cancel action (e.g., clearing the order or navigating back)
    console.log("Cancelled the order");
    setOrderItems(null); // Clear the order if needed
  };

  const handleOrder = async () => {
    const addOrderData = {
      username: foodData?.name || "",
      userphone: foodData?.phone || "",
      items: orderItems || [],
    };
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/order/addOrder`,
        addOrderData
      );
      if (res) {
        const {
          data: { data },
        } = res;

        setResponse([...response, data]);

      } else {
        console.error("Failed to add order", res);
      }
    } catch (error) {
      console.error("Error adding order", error.message);
    }
  };


  return (
    <div className="container mt-2 d-flex">
      <div className="shadow p-4">
        <h2 className="mb-4">Food Order</h2>
        <form onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={foodData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone field */}
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={foodData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="foodId">Food Id</label>
            <input
              type="text"
              className="form-control"
              id="foodId"
              name="foodId"
              value={foodData.foodId}
              onChange={handleChange}
              placeholder="Enter your foodId number"
              required
            />
          </div>

          {/* Food Quantity field */}
          <div className="form-group mb-3">
            <label htmlFor="foodQuantity">Food Quantity</label>
            <input
              type="number"
              className="form-control"
              id="foodQuantity"
              name="foodQuantity"
              value={foodData.foodQuantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Add Food
          </button>
        </form>

        <div className="mt-3">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Food Price</th>
              </tr>
            </thead>
            <tbody>
              {foodList &&
                foodList.length > 0 &&
                foodList.map((order, index) => (
                  <tr key={index}>
                    <td>{order.foodName}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <button type="button" className="btn btn-primary" onClick={handleOrder}>
          Add Order
        </button>
      </div>

      <div>
        {response && response.length > 0 && (
          <OrderBill order={response} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
}

export default FoodOrder;
