import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./store/cartSlice";
import { getProducts } from "./store/productSlice";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleFavorite } from "./store/favouriteSlice";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  // Heart Functionality

  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = (productId) => favorites.includes(productId);

  const handleFavoriteClick = (productId) => {
    dispatch(toggleFavorite(productId));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const sortProducts = (type) => {
    const productToSort = [...sortedProducts]; // Ensure you're sorting the currently sorted/displayed list
    if (type === "highest") {
      productToSort.sort((a, b) => b.price - a.price);
    } else if (type === "lowest") {
      productToSort.sort((a, b) => a.price - b.price);
    }
    setSortedProducts(productToSort);
  };

  // Update search term state based on input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cards = filteredProducts.map((product) => (
    <div className="col-md-4" style={{ marginBottom: "10px" }} key={product.id}>
      <Card
        className="h-100 d-flex justfify-content-center align-items-center "
        style={{ width: "18rem", height: "18rem" }}
      >
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>INR: {product.price}</Card.Text>
          
          <div className="d-flex justify-content-evenly">
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
          
          {/* Heart Button */}
          <Button
          style={{fontSize:"1.2rem",marginLeft:"20px"}}
            variant="link"
            onClick={() => handleFavoriteClick(product.id)}
          >
            {isFavorite(product.id) ? <FaHeart color="red" /> : <FaRegHeart />}
          </Button>

          </div>
          
        </Card.Body>
      </Card>
    </div>
  ));

  if (status === "loading") {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (status === "error") {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Something went wrong!!!! Try again later
      </div>
    );
  }

  return (
    <div className="container container-sm container-md text-center">
      <h1 className="text-center">Product Dashboard</h1>
      <div className="toggle d-flex justify-content-evenly align-items-center text-center mb-4 mt-4">
        <Form className="d-flex border border-secondary">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 "
            aria-label="Search"
            onChange={handleSearchChange}
          />
          {/* Removed the search button as the functionality is real-time */}
        </Form>
        <div className="sort gap-4">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Sort
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => sortProducts("highest")}>
                Highest Price
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortProducts("lowest")}>
                Lowest Price
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="row text-center">{cards}</div>
    </div>
  );
};

export default Product;
