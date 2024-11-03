import React from "react";
function FoodList({ foodItemList }) {
  return (
    <div className="container mt-2 shadow p-4">
      <h2 className="mb-4">Food List</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Food Id</th>
            <th>Food Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {foodItemList &&
            foodItemList.length > 0 &&
            foodItemList.map((order, index) => (
              <tr key={index}>
                <td
                  className="text-truncate"
                  style={{ maxWidth: "100px" }}
                >
                  {order._id}
                </td>
                <td>{order.foodName}</td>
                <td>{order.category}</td>
                <td>{order.description}</td>
                <td>{order.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
