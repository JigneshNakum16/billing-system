import React from "react";
import axios from "axios";

const OrderBill = ({ order }) => {
  const handlePrint = async () => {
    try {
      // Sending SMS message using an external API like Twilio
      const phoneNumber = order[0]?.userphone.startsWith("+91")
        ? order[0]?.userphone
        : `+91${order[0]?.userphone}`;
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/order/send-sms`, // Your SMS sending API route
        {
          phone: phoneNumber,
          message: `Dear ${order[0]?.username}, your order has been placed successfully. Total amount: ₹${order[0]?.totalAmount}`,
        }
      );

      // Trigger print action
      window.print();
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <span>Customer Name : {order[0]?.username}</span>
        <span>Phone : {order[0]?.userphone}</span>
        <br />
      </div>
      <span>Order Date: {new Date(order[0]?.createdAt).toLocaleString()}</span>
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
                  <td>{data?.foodName}</td>
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
        <button
          className="btn btn-primary"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handlePrint}
        >
          Print & Send SMS
        </button>
      </div>
    </div>
  );
};

export default OrderBill;
