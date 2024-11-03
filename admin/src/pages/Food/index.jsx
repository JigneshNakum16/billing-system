import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { deleteFood, getFoods, updateFood } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Food = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState({
    _id: "",
    foodName: "",
    price: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    foodName: "",
    price: "",
    category: "",
    description: "",
  });

  const handleEditClick = (food) => {
    setSelectedFood(food);
    setErrors({
      foodName: "",
      price: "",
      category: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFood({ ...selectedFood, [name]: value });
    validateField(name, value); // Call validation on each input change
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "foodName":
        if (!value || value.trim().length === 0) {
          errorMessage = "Food name is required.";
        }
        break;
      case "price":
        if (!value || value <= 0) {
          errorMessage = "Price must be a positive number.";
        }
        break;
      case "category":
        if (!value || value.trim().length === 0) {
          errorMessage = "Category is required.";
        }
        break;
      case "description":
        if (!value || value.trim().length === 0) {
          errorMessage = "Description is required";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    return errorMessage === ""; // Returns true if no error
  };

  const validateForm = () => {
    const isValid =
      validateField("foodName", selectedFood.foodName) &&
      validateField("price", selectedFood.price) &&
      validateField("category", selectedFood.category) &&
      validateField("description", selectedFood.description);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Do not submit the form if validation fails
    }

    try {
      const { status } = await updateFood(selectedFood._id, selectedFood);
      if (status) {
        fetchFoods(); // Refresh the food list after successful update
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async (id) => {
    const { status } = await deleteFood(id);
    if (status) {
      fetchFoods(); // Refresh the food list after deletion
    }
  };

  const handleAddFood = () => {
    navigate("/addFood");
  };

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      if (response) {
        const {
          data: { data },
        } = response;
        setFoods(data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className={classes.food}>
      <div className="container mt-4">
        <h2>Food Items</h2>
        <button
          type="button"
          className="btn btn-primary my-3 "
          style={{
            backgroundColor: "#438a7a",
            border: "none",
            outline: "none",
          }}
          onClick={handleAddFood}
        >
          + Add Food
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Food ID</th>
              <th>Food Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods && foods.length > 0 ? (
              foods.map((food) => (
                <tr key={food._id}>
                  <td>{food._id}</td>
                  <td>{food.foodName}</td>
                  <td>₹{food.price}</td>
                  <td>{food.category}</td>
                  <td>{food.description}</td>
                  <td>{new Date(food.createdAt).toLocaleString()}</td>
                  <td className="d-flex gap-2">
                    <i
                      className="fa-solid fa-pen-to-square text-primary fs-5 cursor-pointer"
                      onClick={() => handleEditClick(food)}
                      data-bs-toggle="modal"
                      data-bs-target="#editFoodModal"
                    ></i>
                    <i
                      className="fa-solid fa-trash text-danger fs-5 cursor-pointer"
                      onClick={() => handleDelete(food._id)}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No food items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="editFoodModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editFoodModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="editFoodModalLabel">
                Edit Food
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="foodName">Food Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.foodName ? "is-invalid" : ""
                    }`}
                    id="foodName"
                    name="foodName"
                    value={selectedFood.foodName}
                    onChange={handleChange}
                    required
                  />
                  {errors.foodName && (
                    <small className="text-danger">{errors.foodName}</small>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    id="price"
                    name="price"
                    value={selectedFood.price}
                    onChange={handleChange}
                    required
                    min="1"
                    step="0.01"
                  />
                  {errors.price && (
                    <small className="text-danger">{errors.price}</small>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    id="category"
                    name="category"
                    value={selectedFood.category}
                    onChange={handleChange}
                    required
                  />
                  {errors.category && (
                    <small className="text-danger">{errors.category}</small>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    id="description"
                    name="description"
                    value={selectedFood.description}
                    onChange={handleChange}
                    required
                    minLength="10"
                  />
                  {errors.description && (
                    <small className="text-danger">{errors.description}</small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  style={{
                    backgroundColor: "#438a7a",
                    border: "none",
                    outline: "none",
                  }}
                  disabled={!validateForm}
                >
                  Update Food
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
