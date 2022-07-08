import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronRight } from '@mui/icons-material';
import { PortableText } from '@portabletext/react';
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
  container: {
    margin: 20,
    width: `80%`,
    justifyContent: `center`,
    padding: 10,
  },
  card: {
    width: `100%`,
    padding: 10,
    margin: 10,
    backgroundColor: `#fff`,
    borderRadius: 10,
    boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.1)`,
  },
}));

type TipsProps = {
  tips: any;
};

export async function getStaticProps() {
  const tips = await SanityClient.fetch(`*[_type == 'tip']{
  title,
  description,
  }`);

  return {
    props: {
      tips,
    },
    revalidate: 10,
  };
}

const Tips: React.FC<TipsProps> = ({ tips }) => {
  const classes = useStyles();
  return (
    <Layout title="Tips" description="Tips">
      <Grid className={classes.root} container spacing={3} direction="column">
        <Grid item xs={12}>
          <Typography variant="h4">Our Tips:</Typography>
        </Grid>
        <Grid container spacing={2} style={{ padding: 10 }} item xs={12}>
          {tips.map((tip: any) => (
            <Grid key={tip.title} item xs={12} md={12} lg={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ChevronRight />}>
                  <Typography variant="h4">{tip.title}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ display: `flex`, flexDirection: `column` }}
                >
                  <PortableText value={tip.description} />
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Tips;
