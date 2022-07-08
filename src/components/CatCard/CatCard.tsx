import { Button, Card, CardActions, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { NextLinkComposed } from '~/components/Link/Link';
import { SanityImage } from '~/components/SanityImage/SanityImage';

const useStyles = makeStyles({
  root: {
    width: 320,
  },
  cardHeader: {
    '& .MuiCardHeader-content': {
      maxWidth: `100%`,
    },
  },
});

type CatCardProps = {
  name: string;
  imageUrl: string;
  slug: string;
};

const CatCard: React.FC<CatCardProps> = ({ imageUrl, name, slug }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <SanityImage alt={name} src={imageUrl} height={180} width={320} />
      <CardHeader
        className={classes.cardHeader}
        title={name}
        titleTypographyProps={{
          noWrap: true,
          style: {
            maxWidth: `100%`,
          },
        }}
        style={{ maxWidth: `100%` }}
      />
      <CardActions style={{ display: `flex`, flexDirection: `row-reverse` }}>
        <Button
          variant="outlined"
          color="secondary"
          component={NextLinkComposed}
          to={`/cats/${slug}`}
        >
          View Bobtail
        </Button>
      </CardActions>
    </Card>
  );
};

export default CatCard;
