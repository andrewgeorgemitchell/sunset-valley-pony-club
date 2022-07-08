import {
  Button,
  CircularProgress,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pets } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import Layout from '~/components/Layout/Layout';
import { SanityClient } from '~/services/SanityClient';
import { CustomTheme } from '~/styles/theme';
import CatCard from '../../components/CatCard/CatCard';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    display: `grid`,
    marginTop: 5,
    marginBottom: 5,
    gridTemplateColumns: `auto`,
    gridTemplateRows: `auto`,
    gridTemplateAreas: `
      'sidebar'
      'content'
      `,
    paddingLeft: `2%`,
    paddingRight: `2%`,
    gap: 40,
    [theme.breakpoints.up(`md`)]: {
      paddingLeft: `5%`,
      paddingRight: `5%`,
      marginTop: 30,
      marginBottom: 30,
      gridTemplateColumns: `300px auto`,
      gridTemplateRows: `650px auto`,
      gridTemplateAreas: `
          'sidebar content'
          'none content'
          `,
    },
  },
  sidebar: {
    '& > *': {
      flexBasis: `auto`,
    },
    gridArea: `sidebar`,
  },
  content: {
    gridArea: `content`,
  },
}));

type CatsProps = {
  categories: Array<Record<any, any>>;
};

export async function getStaticProps() {
  const categories = await SanityClient.fetch(`*[_type == 'category']`);

  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
}

const Cats: React.FC<CatsProps> = ({ categories }) => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState<Array<Record<any, any>>>([]);
  const queryParams = router.query;

  const [selectedCategory, setSelectedCategory] = useState(
    queryParams.category,
  );
  const [selectedGender, setSelectedGender] = useState(``);

  useEffect(() => {
    const fetchCats = async () => {
      const catRes: Array<Record<any, any>> = await SanityClient.fetch(
        `*[_type == 'cat']{
          _id,
          title,
          slug,
          category->,
          images[]{
            asset->
          },
          sex,
        }`,
      );
      setCats(catRes);
      setLoading(false);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    setSelectedCategory(queryParams.category);
  }, [queryParams]);

  const filteredCats = useMemo(
    () =>
      cats
        .filter((cat) => {
          if (selectedCategory) {
            return cat.category.slug.current === selectedCategory;
          }
          return true;
        })
        .filter((cat) => {
          if (selectedGender) {
            return cat.sex === selectedGender;
          }
          return true;
        }),
    [cats, selectedCategory, selectedGender],
  );

  return (
    <Layout
      title="View our Bobtail Cats"
      description="Full list of Bobtail cats & kittens from Oztoca"
    >
      <div className={classes.root}>
        <Grid
          className={classes.sidebar}
          container
          spacing={3}
          direction="column"
          wrap="nowrap"
          justifyContent="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="h5">Filter:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Category</FormLabel>
              <RadioGroup
                aria-label="Category"
                name="category-radio-filter-group"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                {categories.map((category: any) => (
                  <FormControlLabel
                    key={category._id}
                    value={category.slug.current}
                    control={<Radio />}
                    label={category.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender-radio-filter-group"
                value={selectedGender}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid>
            <Button
              onClick={() => {
                setSelectedCategory(``);
                setSelectedGender(``);
              }}
              variant="outlined"
              fullWidth
            >
              Clear Filter Settings
            </Button>
          </Grid>
        </Grid>
        <Grid
          className={classes.content}
          container
          justifyContent="center"
          alignItems="flex-start"
          style={{ gap: 10 }}
        >
          {loading ? (
            <>
              <Grid item xs={12}>
                <CircularProgress size="lg" />
              </Grid>
            </>
          ) : (
            <>
              {filteredCats.length > 0 ? (
                filteredCats.map((cat: any) => (
                  <Fade key={cat._id} in timeout={500}>
                    <CatCard
                      name={cat.title}
                      imageUrl={cat.images[0].asset.url}
                      slug={cat.slug.current}
                    />
                  </Fade>
                ))
              ) : (
                <Grid
                  container
                  item
                  xs={12}
                  md={4}
                  style={{ alignSelf: `center`, gap: 10 }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Pets style={{ height: 50, width: 50 }} />
                  <Typography variant="h5" align="center">
                    No Bobtails found matching this criteria, please try editing
                    the filter settings
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </div>
    </Layout>
  );
};

export default Cats;
