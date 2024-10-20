import React, { useState } from "react";
import classes from "./styles.module.scss";
import { addFood } from "../../api/auth";

const AddFood = () => {

  const [food, setFood] = useState({
    foodName: "",
    price: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({}); 

  const validate = () => {
    const newErrors = {};

    if (!food.foodName.trim()) {
      newErrors.foodName = "Food name is required.";
    }
    
    if (!food.price.trim()) {
      newErrors.price = "Price is required.";
    } else if (isNaN(food.price) || Number(food.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!food.category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!food.description.trim()) {
      newErrors.description = "Description is required.";
    } 
    // else if (food.description.trim().length < 5) {
    //   newErrors.description = "Description must be at least 5 characters long.";
    // }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

     await addFood(food);

    // Reset form fields
    setFood({
      foodName: "",
      price: "",
      category: "",
      description: "",
    });
  };

  return (
    <div className={classes.addFood}>
      <div className="container mt-4">
        <h2>Add New Food Item</h2>
        <form onSubmit={handleSubmit}>
          {/* Food Name Field */}
          <div className="form-group mb-3">
            <label htmlFor="foodName">Food Name</label>
            <input
              type="text"
              className={`form-control ${errors.foodName ? "is-invalid" : ""}`}
              id="foodName"
              name="foodName"
              value={food.foodName}
              onChange={handleChange}
              placeholder="Enter food name"
            />
            {errors.foodName && (
              <div className="invalid-feedback">{errors.foodName}</div>
            )}
          </div>

          {/* Price Field */}
          <div className="form-group mb-3">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              id="price"
              name="price"
              value={food.price}
              onChange={handleChange}
              placeholder="Enter food price"
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
          </div>

          {/* Category Field */}
          <div className="form-group mb-3">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className={`form-control ${errors.category ? "is-invalid" : ""}`}
              id="category"
              name="category"
              value={food.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
            {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              id="description"
              name="description"
              value={food.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Add Food
          </button>
        </form>
      </div>
   
    </div>
  );
};

export default AddFood;
