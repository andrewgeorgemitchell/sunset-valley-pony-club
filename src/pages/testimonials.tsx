import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';
import { SanityClient } from '../services/SanityClient';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 0,
  },
  card: {
    padding: 30,
    borderRadius: 10,
  },
}));

type testimonialProps = {
  testimonials: any;
};

export async function getStaticProps() {
  const testimonials = await SanityClient.fetch(
    `*[_type == 'testimonial'] {
      author,
      description,

    }`,
  );
  return {
    props: {
      testimonials,
    },
  };
}

const Testimonials: React.FC<testimonialProps> = ({ testimonials }) => {
  const classes = useStyles();

  return (
    <Layout title="Testimonials" description="Testimonials">
      <Grid className={classes.root} container spacing={3} direction="column">
        <Grid item xs={12}>
          <Typography variant="h4">Our Testimonials:</Typography>
        </Grid>
        {testimonials.map((testimonial: any) => (
          <Grid item xs={12} key={testimonial.author}>
            <Card className={classes.card}>
              <Typography>{testimonial.description}</Typography>
              <Typography style={{ fontWeight: 600 }}>
                {testimonial.author}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Testimonials;
