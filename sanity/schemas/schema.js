// eslint-disable-next-line import/no-unresolved
import schemaTypes from 'all:part:@sanity/base/schema-type';
// eslint-disable-next-line import/no-unresolved
import createSchema from 'part:@sanity/base/schema-creator';
import CatSchema from './cat';
import CategorySchema from './category';
import GallerySchema from './gallery';
import TestimonialSchema from './testimonial';
import TipSchema from './tip';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    CatSchema,
    CategorySchema,
    TipSchema,
    TestimonialSchema,
    GallerySchema,
  ]),
});
