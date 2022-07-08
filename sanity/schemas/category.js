const CategorySchema = {
  title: 'Cat Categories',
  name: 'category',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description: 'Name of the category of cat (e.g. "Stud", "Champion")',
      validation: (R) => R.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'The text used for the url, cannot contain spaces',
      validation: (R) => R.required(),
      options: {
        source: 'name',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
  ],
};

export default CategorySchema;
