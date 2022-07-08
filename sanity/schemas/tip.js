const TipSchema = {
  title: 'Tips',
  name: 'tip',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'The title of the tip, show as bolded header text',
      validation: (R) => R.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The body of the tip, show in the detail page',
      validation: (R) => R.required(),
    },
  ],
};

export default TipSchema;
