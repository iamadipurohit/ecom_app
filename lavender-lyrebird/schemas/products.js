//created a Product schema and exported it as a basic js object

export default {
  name: 'product',
  title: 'Product',
  type: 'document',

  //fields that you want to add in your schema
  fields: [
    {
      name: 'image',
      title: 'Image',
      //here you want to add a field which will take array of type 'images'. Means it will take an array of images
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
  ],
}
