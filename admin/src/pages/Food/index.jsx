// import React, { useEffect, useState } from "react";
// import classes from "./styles.module.scss";
// import { deleteFood, getFoods } from "../../api/auth";
// import { useNavigate } from "react-router-dom";

// const Food = () => {
//   const navigate = useNavigate();

//   const [foods, setFoods] = useState([]);
//   const [showModal, setShowModal] = useState(false); // Manage modal open/close state
//   const [selectedFood, setSelectedFood] = useState({
//     foodName: "",
//     price: "",
//     category: "",
//     description: "",
//   });
//   const handleEditClick = (food) => {
//     setSelectedFood(food); // Set the food data for editing
//     setShowModal(true); // Open the modal
//   };

//   // Function to handle modal close
//   const handleClose = () => setShowModal(false);

//   // Function to handle input change in the modal
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedFood({ ...selectedFood, [name]: value });
//   };
//   const handleEdit = (id) => {
//     // Handle edit logic here
//     console.log(`Edit food with ID: ${id}`);
//     // navigate(`/addFood/${id}`)
//     // You can open a modal or redirect to an edit form
//   };

//   const handleDelete = async (id) => {
//     const { status } = await deleteFood(id);
//     if (status) {
//       fetchFoods();
//       const updatedFoods = foods.filter((food) => food._id !== id);
//       setFoods(updatedFoods);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Call the API to update the food item here
//   };

//   const handleAddFood = () => {
//     navigate("/addFood");
//   };

//   const fetchFoods = async () => {
//     try {
//       const response = await getFoods();

//       if (response) {
//         const {
//           data: { data },
//         } = response;
//         setFoods(data);
//       }
//     } catch (error) {
//       console.error("error", error);
//     }
//   };

//   useEffect(() => {
//     fetchFoods();
//   }, []);
//   return (
//     <div className={classes.food}>
//       <div className="container mt-4">
//         <h2>Food Items</h2>
//         <button
//           type="button"
//           className="btn btn-primary my-3"
//           onClick={handleAddFood}
//         >
//           + Add Food
//         </button>
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Food ID</th>
//               <th>Food Name</th>
//               <th>Price</th>
//               <th>Category</th>
//               <th>Description</th>
//               <th>Created At</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {foods && foods.length > 0 ? (
//               foods.map((food) => (
//                 <tr key={food._id}>
//                   <td>{food._id}</td>
//                   <td>{food.foodName}</td>
//                   <td>₹{food.price}</td>
//                   <td>{food.category}</td>
//                   <td>{food.description}</td>
//                   <td>{new Date(food.createdAt).toLocaleString()}</td>
//                   <td>
//                     {/* Action buttons for edit and delete */}
//                     <button
//                       className="btn btn-primary btn-sm me-2"
//                       onClick={() => handleEdit(food._id)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(food._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   No food items found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div
//         className="modal fade"
//         id="editFoodModal"
//         tabIndex="-1"
//         role="dialog"
//         aria-labelledby="editFoodModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="editFoodModalLabel">Edit Food</h5>
//               <button type="button" className="close" onClick={handleClose}>
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleSubmit}>
//                 {/* Food Name */}
//                 <div className="form-group mb-3">
//                   <label htmlFor="foodName">Food Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="foodName"
//                     name="foodName"
//                     value={selectedFood.foodName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Price */}
//                 <div className="form-group mb-3">
//                   <label htmlFor="price">Price</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="price"
//                     name="price"
//                     value={selectedFood.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Category */}
//                 <div className="form-group mb-3">
//                   <label htmlFor="category">Category</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="category"
//                     name="category"
//                     value={selectedFood.category}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Description */}
//                 <div className="form-group mb-3">
//                   <label htmlFor="description">Description</label>
//                   <textarea
//                     className="form-control"
//                     id="description"
//                     name="description"
//                     value={selectedFood.description}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   Update Food
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Food;

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

  // Fetch all foods on component mount
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

  // Handle opening the modal and setting selected food data
  const handleEditClick = (food) => {
    setSelectedFood(food); // Set the food data for editing
    const modalElement = document.getElementById("editFoodModal");
    const modal = new window.bootstrap.Modal(modalElement); // Initialize Bootstrap modal
    modal.show(); // Show the modal
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFood({ ...selectedFood, [name]: value });
  };

  // Handle form submission for editing the food item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status } = await updateFood(selectedFood._id, selectedFood); // Assuming updateFood API exists
      console.log('status', status)
      if (status) {
        const modalElement = document.getElementById("editFoodModal");
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        modal.hide(); // Hide the modal after updating
        fetchFoods(); // Refresh the food list
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    const { status } = await deleteFood(id);
    if (status) {
      fetchFoods(); // Refresh the food list
    }
  };

  // Handle adding new food
  const handleAddFood = () => {
    navigate("/addFood");
  };

  return (
    <div className={classes.food}>
      <div className="container mt-4">
        <h2>Food Items</h2>
        <button
          type="button"
          className="btn btn-primary my-3"
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
                  <td>
                    {/* Action buttons for edit and delete */}
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditClick(food)}
                      data-bs-toggle="modal"
                      data-bs-target="#editFoodModal"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(food._id)}
                    >
                      Delete
                    </button>
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

      {/* Bootstrap Modal for Edit */}
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
              <h5 className="modal-title" id="editFoodModalLabel">Edit Food</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Food Name */}
                <div className="form-group mb-3">
                  <label htmlFor="foodName">Food Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="foodName"
                    name="foodName"
                    value={selectedFood.foodName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Price */}
                <div className="form-group mb-3">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={selectedFood.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div className="form-group mb-3">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={selectedFood.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="form-group mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={selectedFood.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
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
