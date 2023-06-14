import React from "react";

import { HeroBanner, Product, FooterBanner } from "@/components";
import { client } from "@/lib/client";
const Index = ({ products, banners }) => {
  console.log(products);
  return (
    <>
      <HeroBanner heroBanner={banners.length && banners[0]}></HeroBanner>
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Some Products</p>
      </div>
      <div className="products-container">
        {products?.map((prod) => (
          <Product key={prod._id} product={prod}></Product>
        ))}
      </div>
      <FooterBanner footerBanner={banners && banners[0]}></FooterBanner>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(bannerQuery);

  return {
    props: { products, banners },
  };
};

export default Index;
