const TestimonialSchema = {
  title: 'Testimonials',
  name: 'testimonial',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'string',
      description: 'Person who wrote the testimonial',
      validation: (R) => R.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      description: 'The body of the testimonial, show in the detail page',
      validation: (R) => R.required(),
    },
  ],
};

export default TestimonialSchema;
