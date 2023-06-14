//database = content lake

//We created a sanity client to use the data stored in sanity content lake and show it in our frontend application

//import sanityClient to make a client which can interact with frontend app and sanity database(content lake).
import sanityClient from "@sanity/client";

//import imageUrlBuilder to access urls of the images stored in database.
import imageUrlBuilder from "@sanity/image-url";

//give the req info to the client
export const client = sanityClient({
  projectId: "3katxozg",
  dataset: "production",
  apiVersion: "2023-06-11",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

//it will gonna provide the url of the image stored.
export const urlFor = (source) => builder.image(source);

//Now you can use sanity client whereever in your code.
