import react from "react";
import styles from "../stylesheets/adminPanel.css";

function Order(props) {
  const { idx, product, user, shipping, status } = props;
  return (
    <div>
      <div className="row">
        <div className="col-1">{JSON.stringify(idx)}</div>
        <div className="col-3">
        {
            user && user.firstName
        }
        </div>
        <div className="col-3">{product?.substring(0, 20)}</div>
        <div className="col-3">{status}</div>
        <div className="col-2" style={{ textAlign: "center" }}>
          {shipping ? "Yes" : "No"}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Order;
