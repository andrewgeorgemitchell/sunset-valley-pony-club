import { Card, Dialog, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Layout from '~/components/Layout/Layout';
import { SanityImage } from '~/components/SanityImage';
import { SanityClient } from '~/services/SanityClient';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    marginTop: 30,
  },
  galleryCont: {
    display: `grid`,
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: 20,
    [theme.breakpoints.up(`sm`)]: {
      gridTemplateColumns: `repeat(2, 1fr)`,
    },
    [theme.breakpoints.up(`md`)]: {
      gridTemplateColumns: `repeat(3, 1fr)`,
    },
    [theme.breakpoints.up(`lg`)]: {
      gridTemplateColumns: `repeat(4, 1fr)`,
    },
    [theme.breakpoints.up(`xl`)]: {
      gridTemplateColumns: `repeat(5, 1fr)`,
    },
  },
  card: {
    borderRadius: 10,
    margin: `0 auto`,
    height: 225,
    width: 337,
  },
}));

type GalleryProps = {
  gallery: any;
};

export async function getStaticProps() {
  const gallery = await SanityClient.fetch(`*[_type == 'gallery']{
  "imageUrl": image.asset->url,
  title,
  }`);

  return {
    props: {
      gallery,
    },
    revalidate: 10,
  };
}

const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const handleSelect = (image: any) => {
    setOpen(true);
    setSelectedPhoto(image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout title="Gallery" description="Gallery">
      <Grid
        className={classes.root}
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ paddingTop: 16, paddingBottom: 16 }}
      >
        <Typography variant="h4" align="center" paragraph>
          The Awww Gallery
        </Typography>
        <div className={classes.galleryCont}>
          {gallery.map((image: any) => (
            <Card
              key={image.imageUrl}
              onClick={() => handleSelect(image)}
              style={{ cursor: `pointer` }}
              className={classes.card}
            >
              <SanityImage
                height={225}
                width={337}
                src={image.imageUrl}
                alt={image.title}
              />
            </Card>
          ))}
        </div>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        {selectedPhoto && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              style={{ maxHeight: `85vh` }}
              src={`${selectedPhoto.imageUrl}?format=auto`}
              alt={selectedPhoto.title}
            />
            <Typography
              variant="h4"
              align="center"
              style={{ background: `#fff`, padding: 10 }}
            >
              {selectedPhoto.title}
            </Typography>
          </>
        )}
      </Dialog>
    </Layout>
  );
};

export default Gallery;
