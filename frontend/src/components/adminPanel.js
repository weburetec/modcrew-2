import react, { useState, useEffect } from "react";
import styles from "../stylesheets/adminPanel.css";
import { useCookies } from "react-cookie";

import Navbar from "./navbar.js";
import NewUser from "./newUser.js";
import Order from "./order.js";

import home from "../icons/home.svg";
import customers from "../icons/customers.svg";
import orders from "../icons/orders2.svg";
import product from "../icons/product.svg";
import inventory from "../icons/inventory.svg";
import add from "../icons/add.svg";
import logout from "../icons/logout2.svg";

import arrowUp from "../icons/arrowUp.svg";
import axios from "axios";

function AdminPanel() {
  const [cookies, setCookie, removeCookie, get] = useCookies(["token"]);
  const loggedInToken = cookies.token;

  const [current, setCurrent] = useState("dashboard");
  const [allUsers, setAllUsers] = useState(null);
  const [allOrders, setAllOrders] = useState(null);
  const [gettingOrders, setGettingOrders] = useState(null);

  function Logout() {
    removeCookie("token");
    window.location.href = "/";
  }

  useEffect(() => {
    console.log("inside use effect1");
    axios
      .get(
        "https://modcrew-dev.herokuapp.com/api/v1/users",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInToken}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        setAllUsers(response.data.data);
      });
  }, []);

  useEffect(() => {

    axios
      .get(
        "https://modcrew-dev.herokuapp.com/api/v1/orders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInToken}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setAllOrders(response.data.data);
        setGettingOrders([]);
      });
  }, []);

  function renderUsers() {
    return allUsers?.map((user, idx) => {
      if (idx < 5) {
        return <NewUser name={user.firstName} email={user.email} />;
      }
    });
  }

  function renderSomeOrders() {
    var i;
    var j;
    var k = 1;
    for (i = 0; i < allOrders?.length; i++) {
      for (j = 0; j < allOrders[i]?.order_items?.length; j++) {
        gettingOrders?.push({
          idx: k,
          product: allOrders[i]?.order_items[j]?.name,
          user: allOrders[i]?.user,
          shipping: allOrders[i]?.shipping_is_billing,
          status: allOrders[i]?.status,
        });
        k = k + 1;
      }
    }
    return gettingOrders?.map((particular, idx) => {
      if (idx < 5) {
        return (
          <Order
            idx={particular.idx}
            product={particular.product}
            user={particular.user}
            shipping={particular.shipping}
            status={particular.status}
          />
        );
      }
    });
  }

  function renderDashboard() {
    return (
      <div>
        <h4>Admin Dashboard</h4>
        <br />
        <div className="row">
          <div
            className="col-md-2 admin-top"
            style={{ backgroundColor: "#0075FF" }}
          >
            <p style={{ color: "black" }}>New Orders</p>
            <h6>₹2,34,567/-</h6>
            <p>
              5.43%
              <img src={arrowUp} />
            </p>
          </div>
          <div
            className="col-md-2 admin-top"
            style={{ backgroundColor: "#8862E0" }}
          >
            <p style={{ color: "black" }}>Total Income</p>
            <h6>₹2,34,567/-</h6>
            <p>
              5.43%
              <img src={arrowUp} />
            </p>
          </div>
          <div
            className="col-md-2 admin-top"
            style={{ backgroundColor: "#2196F3" }}
          >
            <p style={{ color: "black" }}>Total Expense</p>
            <h6>₹2,34,567/-</h6>
            <p>
              5.43%
              <img src={arrowUp} />
            </p>
          </div>
          <div
            className="col-md-2 admin-top"
            style={{ backgroundColor: "#FFAF00" }}
          >
            <p style={{ color: "black" }}>New Users</p>
            <h6>₹2,34,567/-</h6>
            <p>
              5.43%
              <img src={arrowUp} />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 new-users-div">
            <h5 className="new-users-heading">New Users Registered</h5>
            <div className="new-users">{renderUsers()}</div>
          </div>
          <div className="col-md-8 latest-orders-div">
            <h5 className="latest-users-heading">Order Overview</h5>
            <div className="latest-orders">
              <div className="row">
                <div className="col-1" style={{ fontWeight: "bold" }}>
                  No.
                </div>
                <div className="col-3" style={{ fontWeight: "bold" }}>
                  User
                </div>
                <div className="col-3" style={{ fontWeight: "bold" }}>
                  Product
                </div>
                <div className="col-3" style={{ fontWeight: "bold" }}>
                  Status
                </div>
                <div className="col-2" style={{ fontWeight: "bold" }}>
                  Shipping
                </div>
              </div>
              <hr />
              {renderSomeOrders()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderCustomers() {
    return <div>2</div>;
  }

  function renderAllOrders() {
    console.log("gettingOrders", gettingOrders);
    return gettingOrders?.map((particular) => {
      return (
        <Order
          idx={particular.idx}
          product={particular.product}
          user={particular.user}
          shipping={particular.shipping}
          status={particular.status}
        />
      );
    });
  }

  function renderOrders() {
    return (
      <div>
        <h4>All Orders</h4>
        <br />
        <div style={{ backgroundColor: "#fff" }}>
          <div className="row">
            <div className="col-1" style={{ fontWeight: "bold" }}>
              No.
            </div>
            <div className="col-3" style={{ fontWeight: "bold" }}>
              User
            </div>
            <div className="col-3" style={{ fontWeight: "bold" }}>
              Product
            </div>
            <div className="col-3" style={{ fontWeight: "bold" }}>
              Status
            </div>
            <div className="col-2" style={{ fontWeight: "bold" }}>
              Shipping
            </div>
          </div>
          <hr />
          {renderAllOrders()}
        </div>
      </div>
    );
  }

  function renderProduct() {
    return <div>4</div>;
  }

  function renderInventory() {
    return <div>5</div>;
  }

  const [titleProduct, setTitleProduct] = useState(null);
  const [description, setDescription] = useState(null);
  const [isPublished, setIsPublished] = useState(null);
  const [color, setColor] = useState(null);
  const [mrp, setMrp] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [tax, setTax] = useState(null);
  const [hsn, setHsn] = useState(null);
  const [image, setImage] = useState(null);
  const [imagesSend, setImagesSend] = useState([]);
  const [categoriesAdd, setCategoriesAdd] = useState(null);

  async function submitProduct() {
    const formData = new FormData();

    formData.append("title", "test product-101");
    formData.append("description", "Size: 8.25inch x 2.75inch");
    formData.append("description", "something: 8.25inch x 2.75inch");

    selectedSubCategories.forEach((category) => {
      formData.append("category", category);
    });
    formData.append("isPublished", false);
    formData.append("color", "BLACK");
    formData.append("mrp", 399);
    formData.append("sellingPrice", 249);
    formData.append("tax", 18);
    formData.append("hsn", 12345678);
    imagesSend.forEach((particularImage) => {
      formData.append("images", particularImage);
    });
    //formData.append("images", imagesSend);
    console.log("form data", formData.getAll("category"));
    // const hello = {
    //     "title": "test product-101",
    //     "description": [
    //         "Size: 8.25inch x 2.75inch",
    //         "Laminated for indoor or outdoor use"
    //     ],
    //     "category": [
    //         "collectibles",
    //         "key-chain"
    //     ],
    //     "isPublished": false,
    //     "color": "BLACK",
    //     "mrp": 399,
    //     "sellingPrice": 249,
    //     "tax": 18,
    //     "hsn": 12345678,
    //     "images": imagesSend
    // }

    axios
      .post("https://modcrew-dev.herokuapp.com/api/v1/products", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInToken}`,
        },
      })
      .then((response) => {
        // setAllOrders(response.data.data);
        console.log(response);
      });
  }

  var selectedSubCategories = [];

  function handleCheckboxCLick(e) {
    console.log(selectedSubCategories);
    const checkBox = e.target;
    const subcategory = checkBox.value;
    if (checkBox.checked == true) {
      selectedSubCategories.push(subcategory);
    } else {
      selectedSubCategories = selectedSubCategories.filter(function (item) {
        return item !== subcategory;
      });
    }
    console.log("product add page", selectedSubCategories);
  }

  function renderAddProduct() {
    return (
      <div>
        <h4>Add Product</h4>
        <br />
        <div className="row">
          <div className="col-md-6 add-product-fields">
            <input
              type="text"
              placeholder="title"
              value={titleProduct}
              onChange={(e) => {
                setTitleProduct(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="isPublished"
              value={isPublished}
              onChange={(e) => {
                setIsPublished(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="mrp"
              value={mrp}
              onChange={(e) => {
                setMrp(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="sellingPrice"
              value={sellingPrice}
              onChange={(e) => {
                setSellingPrice(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="tax"
              value={tax}
              onChange={(e) => {
                setTax(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="hsn"
              value={hsn}
              onChange={(e) => {
                setHsn(e.target.value);
              }}
            ></input>
            <br />
            <label> Images: &nbsp; </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                setImagesSend([...imagesSend, ...e.target.files]);
              }}
            />
          </div>
          <div className="col-md-6  ">
            <textarea
              className = "hi"
              type="text"
              rows="4"
              cols="50"
              placeholder="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <div className="row all-categories all-categories-add">
              <h6>Select categories</h6>
              <div className="sub-category-div">
                <label for="active-wear">Active Wear</label>
                <input
                  style={{ color: "red" }}
                  type="checkbox"
                  id="active-wear"
                  name="vehicle1"
                  value="active-wear"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="jogger">Jogger</label>
                <input
                  style={{ color: "red" }}
                  type="checkbox"
                  id="jogger"
                  name="vehicle1"
                  value="jogger"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="jersey">Jersey</label>
                <input
                  type="checkbox"
                  id="jersey"
                  name="vehicle1"
                  value="jersey"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
              </div>
              <div className="sub-category-div">
                <label for="top-wear">Top Wear</label>
                <input
                  style={{ color: "red" }}
                  type="checkbox"
                  id="top-wear"
                  name="vehicle1"
                  value="top-wear"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="henley">Henley</label>
                <input
                  type="checkbox"
                  id="henley"
                  name="vehicle1"
                  value="henley"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="crop-top">Crop-top</label>
                <input
                  type="checkbox"
                  id="crop-top"
                  name="vehicle1"
                  value="crop-top"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="round-neck">Round-neck</label>
                <input
                  type="checkbox"
                  id="round-neck"
                  name="vehicle1"
                  value="round-neck"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
              </div>
              <div className="sub-category-div">
                <label for="accessories">Accessories</label>
                <input
                  style={{ color: "red" }}
                  type="checkbox"
                  id="accessories"
                  name="vehicle1"
                  value="accessories"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="cap">Cap</label>
                <input
                  type="checkbox"
                  id="cap"
                  name="vehicle1"
                  value="cap"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="bag">Bag</label>
                <input
                  type="checkbox"
                  id="bag"
                  name="vehicle1"
                  value="bag"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="bandana">Bandana</label>
                <input
                  type="checkbox"
                  id="bandana"
                  name="vehicle1"
                  value="bandana"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
              </div>
              <div className="sub-category-div">
                <label for="bottom-wear">Bottom Wear</label>
                <input
                  style={{ color: "red" }}
                  type="checkbox"
                  id="bottom-wear"
                  name="vehicle1"
                  value="bottom-wear"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="shorts">Shorts</label>
                <input
                  type="checkbox"
                  id="shorts"
                  name="vehicle1"
                  value="shorts"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
              </div>
              <div className="sub-category-div">
                <label for="collectibles">Collectibles</label>
                <input
                  style={{ color: "red" }}
                  type="checkbox"
                  id="collectibles"
                  name="vehicle1"
                  value="collectibles"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="diary">Diary</label>
                <input
                  type="checkbox"
                  id="diary"
                  name="vehicle1"
                  value="diary"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="sticker">Sticker</label>
                <input
                  type="checkbox"
                  id="sticker"
                  name="vehicle1"
                  value="sticker"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="badge">Badge</label>
                <input
                  type="checkbox"
                  id="badge"
                  name="vehicle1"
                  value="badge"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="key-chain">Key-chain</label>
                <input
                  type="checkbox"
                  id="key-chain"
                  name="vehicle1"
                  value="key-chain"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
                <label for="poster">Poster</label>
                <input
                  type="checkbox"
                  id="posterd"
                  name="vehicle1"
                  value="poster"
                  onClick={(e) => {
                    handleCheckboxCLick(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="add-product-btn"
          onClick={() => {
            submitProduct();
          }}
        >
          Add Product
        </button>
      </div>
    );
  }
  const [size, setsize] = useState(null);
  const [sku, setsku] = useState(null);
  const [stockCapacity, setStockCapacity] = useState(null);
  const [ProductID, setProductID] = useState(null);

  function addVariation() {
    axios
      .get(
        "https://modcrew-dev.herokuapp.com/api/v1/products" + { ProductID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInToken}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        response.data.variations.push({
          size: size,
          sku: sku,
          stockQuantity: stockCapacity,
        });
      });
  }

  function renderAddVariation() {
    return (
      <div>
        <h4>Add Variation</h4>
        <br />
        <div className="col-6 add-product-fields">
          <input
            type="text"
            placeholder="Product ID"
            value={ProductID}
            onChange={(e) => {
              setProductID(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => {
              setsize(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Sku"
            value={sku}
            onChange={(e) => {
              setsku(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Stock Capacity"
            value={stockCapacity}
            onChange={(e) => {
              setStockCapacity(e.target.value);
            }}
          ></input>
        </div>
        <button
          className="add-variation-btn"
          onClick={() => {
            addVariation();
          }}
        >
          Add Variation
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="col-2 admin-menu">
          <button
            className={
              current === "dashboard"
                ? "admin-menu-btns admin-menu-btn-clicked"
                : "admin-menu-btns"
            }
            onClick={() => {
              setCurrent("dashboard");
            }}
          >
            <img src={home} /> &nbsp; &nbsp; &nbsp; Dashboard
          </button>
          <br />
          <button
            className={
              current === "customers"
                ? "admin-menu-btns admin-menu-btn-clicked"
                : "admin-menu-btns"
            }
            onClick={() => {
              setCurrent("customers");
            }}
          >
            <img src={customers} /> &nbsp; &nbsp; &nbsp; Customers
          </button>
          <br />
          <button
            className={
              current === "orders"
                ? "admin-menu-btns admin-menu-btn-clicked"
                : "admin-menu-btns"
            }
            onClick={() => {
              setCurrent("orders");
            }}
          >
            <img src={orders} /> &nbsp; &nbsp; &nbsp; Orders
          </button>
          <br />
          <button
            className={
              current === "product"
                ? "admin-menu-btns admin-menu-btn-clicked"
                : "admin-menu-btns"
            }
            onClick={() => {
              setCurrent("product");
            }}
          >
            <img src={product} /> &nbsp; &nbsp; &nbsp; Product
          </button>
          <br />
          <button
            className={
              current === "inventory"
                ? "admin-menu-btns admin-menu-btn-clicked"
                : "admin-menu-btns"
            }
            onClick={() => {
              setCurrent("inventory");
            }}
          >
            <img src={inventory} /> &nbsp; &nbsp; &nbsp; Inventory
          </button>
          <br />
          <button
            className={
              current === "addProduct"
                ? "admin-menu-btns admin-menu-btn-clicked"
                : "admin-menu-btns"
            }
            onClick={() => {
              setCurrent("addProduct");
            }}
          >
            <img src={add} /> &nbsp; &nbsp; &nbsp; Add Product
          </button>
          <br />
          <button
            className={
              current === "addVariation"
                ? "admin-menu-btns admin-menu-btn-clicked"
                : "admin-menu-btns"
            }
            onClick={() => {
              setCurrent("addVariation");
            }}
          >
            <img src={add} /> &nbsp; &nbsp; &nbsp; Add Variation
          </button>
          <br />
          <button className="admin-menu-btns" onClick={Logout}>
            <img src={logout} /> &nbsp; &nbsp; &nbsp; Logout
          </button>
        </div>
        <div className="col-9 admin-main">
          {current === "dashboard" && renderDashboard()}
          {current === "customers" && renderCustomers()}
          {current === "orders" && renderOrders()}
          {current === "product" && renderProduct()}
          {current === "inventory" && renderInventory()}
          {current === "addProduct" && renderAddProduct()}
          {current === "addVariation" && renderAddVariation()}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
