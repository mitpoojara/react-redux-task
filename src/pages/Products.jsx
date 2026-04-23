import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://dummyjson.com/products");
      dispatch(setProducts(res.data.products));
    };
    fetchProducts();
  }, [dispatch]);

  //  Add / Update Product
  const handleAddOrUpdate = () => {
    if (!title || !price) {
      alert("Enter title & price");
      return;
    }

    if (editId) {
      //  Update
      const updated = products.map((item) =>
        item.id === editId ? { ...item, title, price } : item
      );
      dispatch(setProducts(updated));
      setEditId(null);
    } else {
      //  Add
      const newProduct = {
        id: Date.now(),
        title,
        price,
        category: "new",
        stock: 1,
      };
      dispatch(setProducts([newProduct, ...products]));
    }

    setTitle("");
    setPrice("");
  };

  // for  Delete
  const handleDelete = (id) => {
    const updated = products.filter((item) => item.id !== id);
    dispatch(setProducts(updated));
  };

  // for Edit
  const handleEdit = (item) => {
    setTitle(item.title);
    setPrice(item.price);
    setEditId(item.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products Page</h2>

      <p>Total Products: {products.length}</p>

      {/* FORM SHOW */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            padding: "5px 10px",
            marginRight: "5px",
            cursor: "pointer",
          }} onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE SHOW */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.stock}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }} onClick={() => handleEdit(item)}>Edit</button>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }} onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;