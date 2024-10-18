import React from "react";
import axios from "axios";

const OrderBill = ({ order, onCancel }) => {
  const handlePrint = async () => {
    try {
      // Sending SMS message using an external API like Twilio
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/send-sms`, // Your SMS sending API route
        {
          phone: order.userphone,
          message: `Dear ${order.username}, your order has been placed successfully. Total amount: ₹${order.totalAmount}`,
        }
      );
      console.log("SMS sent", response.data);

      // Trigger print action
      window.print();
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  const handleCancel = () => {
    onCancel(); // Call the onCancel function to handle the cancel action
  };

  return (
    <div className="container shadow p-4">
      <h3 className="mt-3">Bill Order </h3>
      <div>
        <span>Customer Name : {order[0]?.username}</span><br />
        <span>Phone : {order[0]?.userphone}</span>
      </div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order &&
            order.length > 0 &&
            order?.map((item, index) =>
              item?.items?.map((data) => (
                <tr key={data?.foodId || index}>
                  <td>{data?.foodId}</td>
                  <td>{data?.quantity}</td>
                  <td>₹{data?.price}</td>
                </tr>
              ))
            )}
        </tbody>
        <tfoot>
          {order &&
            order.length > 0 &&
            order?.map((item, index) => (
              <tr key={index}>
                <th colSpan="2">Total</th>
                <th>₹{item?.totalAmount}</th>
              </tr>
            ))}
        </tfoot>
      </table>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-primary" onClick={handlePrint}>
          Print & Send SMS
        </button>
        <button className="btn btn-danger" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderBill;
