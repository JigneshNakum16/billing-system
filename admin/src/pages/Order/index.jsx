import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { getCustomerOrder } from "../../api/auth";

const Order = () => {
  const [foodOrder, setFoodOrder] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getCustomerOrder();

      if (response) {
        const {
          data: { data },
        } = response;
        setFoodOrder(data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={classes.order}>
      <div className="container mt-4">
        <h2>Orders List</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Username</th>
              <th>User Phone</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {foodOrder && foodOrder.length > 0 ? (
              foodOrder.map((order, orderIndex) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.username}</td>
                  <td>{order.userphone}</td>
                  <td>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, itemIndex) => (
                          <tr key={item._id}>
                            <td>{item.foodName}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
