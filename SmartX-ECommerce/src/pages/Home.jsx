import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { fetchData } from "../features/productSlice";
import { nanoid } from "@reduxjs/toolkit";
import { addToCart } from "../features/cartSlice";
import { NavLink } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [isAddedToCart, setisAddedToCart] = useState();
  // const data = useSelector(state => state.products);
  const API = "https://dummyjson.com/products/";
  const { data } = useFetch(API);

  // useEffect(() => {
  //     productData && console.log(productData.products)
  //     productData && dispatch(fetchData(...productData.products))
  //     console.log(data);

  // }, [productData, dispatch])

  return (
    <main>
      <div className="cards">
        {data ? (
          data.products.map((product) => {
            const { id, images, title, price, rating } = product || {};

            return (
              <article key={nanoid() + id} className="card">
                <div>
                  <img src={images[0]} alt={title} width="200" />
                </div>{" "}
                <div className="detail">
                  <h1 className="text-md px-2 pt-4 font-bold">{title}</h1>
                  <hr />
                  <div className="about">
                    <span className="price">₹ {price}</span>
                    <span className="rating">({rating})⭐</span>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      dispatch(addToCart({ id, images, title, price, rating }));
                      setisAddedToCart(true);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="loader-wrap">
            <span className="loader">Loading data Please Wait...</span>
          </div>
        )}
      </div>

      {data && (
        <>
          <NavLink
            to="/cart"
            className="bg-purple text-md mx-auto mt-10 w-fit rounded-md p-2.5 px-10 font-bold uppercase text-white hover:opacity-85"
            onClick={() => {
              dispatch(addToCart({ id, images, title, price, rating }));
              setisAddedToCart(true);
            }}
          >
            Go To Cart
          </NavLink>
          <button
            onClick={() => {
              document
                .querySelector("main")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="fixed bottom-4 right-4 h-10 w-10 rounded-full bg-white text-2xl shadow-md"
          >
            🔝
          </button>
        </>
      )}
    </main>
  );
}

export default Home;
