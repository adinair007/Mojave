import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import Desert from "../../assets/Desert.jpg";
import Header from "../../components/Header";
import Product from "../../components/Product";

import { QUERY_ALL_PRODUCTS } from "../../utils/queries";

import "./Home.css";

function Home() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  return (
    <div>
      <Header />
      <div className="home">
        <div className="home_container">
          <img className="home_image" src={Desert} alt="Desert art" />
          <div className="home_row">
            {loading ? (
              <div>Loading products</div>
            ) : (
              data.products.map((product) => (
                <Product
                  id={product._id}
                  title={product.name}
                  price={product.price}
                  image={product.image}
                  rating={5}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
