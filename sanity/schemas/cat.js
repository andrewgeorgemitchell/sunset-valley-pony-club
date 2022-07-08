const CatSchema = {
  title: 'Cats',
  name: 'cat',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'The title of the cat, show in the thumbnail',
      validation: (R) => R.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description:
        'The text used for the url, cannot contain spaces, MUST be unique',
      validation: (R) => R.required(),
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The description of the cat, show in the detail page',
      validation: (R) => R.required(),
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Images of the cat',
      validation: (R) => R.required(),
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'The category of the cat',
      validation: (R) => R.required(),
    },
    {
      title: 'Age',
      name: 'age',
      type: 'string',
      description: 'Used to filter on website',
      options: {
        list: [
          { title: 'Kitten', value: 'kitten' },
          { title: 'Adult', value: 'adult' },
        ],
      },
      validation: (R) => R.required(),
    },
    {
      title: 'Sex',
      name: 'sex',
      type: 'string',
      options: {
        list: [
          { title: 'Male', value: 'male' },
          { title: 'Female', value: 'female' },
        ],
      },
      validation: (R) => R.required(),
    },
  ],
};

export default CatSchema;
