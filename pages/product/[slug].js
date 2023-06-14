import React, { useState } from "react";
import { client, urlFor } from "@/lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOulineStar,
} from "react-icons/ai";
import { Product } from "@/components";
import { useStateContext } from "@/context/StateContext";
const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const { incQty, decQty, qty, onAdd, setshowCart } = useStateContext();
  const [index, setIndex] = useState(0);
  const onBuyHandler = () => {
    onAdd(product, qty);
    setshowCart(true);
  };
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            ></img>
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => {
              return (
                <img
                  key={i}
                  src={urlFor(item)}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => {
                    setIndex(i);
                  }}
                ></img>
              );
            })}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar></AiFillStar>
              <AiFillStar></AiFillStar>
              <AiFillStar></AiFillStar>
              <AiFillStar></AiFillStar>
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={() => {
                  decQty();
                }}
              >
                <AiOutlineMinus></AiOutlineMinus>
              </span>
              <span className="num">{qty}</span>
              <span
                className="plus"
                onClick={() => {
                  incQty();
                }}
              >
                <AiOutlinePlus></AiOutlinePlus>
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                onAdd(product, qty);
              }}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={onBuyHandler}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item}></Product>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.
//When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.
export const getStaticPaths = async () => {
  //first you get all the paths for which this dynamic page will render
  const query = `*[_type=='product']{
        slug{
            current
        }
    }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  //then you return that paths as object property.
  return {
    paths,
    fallback: "blocking",
  };
};

//If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
//Here you can fetch data from api and send them to components as props.
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
