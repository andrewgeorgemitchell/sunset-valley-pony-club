import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import React, { useMemo } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const useStyles = makeStyles(() => ({
  root: {
    display: `flex`,
    flexDirection: `column`,
    minHeight: `100vh`,
    position: `relative`,
    backgroundColor: `#fff`,
  },
}));

type LayoutProps = {
  title: string;
  description: string;
  tags?: Array<{
    name: string;
    content: string;
  }>;
};

const Layout: React.FC<LayoutProps> = ({
  title,
  description,
  tags,
  children,
}) => {
  const classes = useStyles();

  const NavLinks = useMemo(
    () => [
      {
        label: `Kittens`,
        link: `/cats?category=kittens`,
      },
      {
        label: `Adults`,
        subLinks: [
          {
            label: `Queens`,
            link: `/cats?category=queens`,
          },
          {
            label: `Studs`,
            link: `/cats?category=studs`,
          },
          {
            label: `Champions`,
            link: `/cats?category=champions`,
          },
        ],
      },
      {
        label: `Testimonials`,
        link: `/testimonials`,
      },
      {
        label: `Tips`,
        link: `/tips`,
      },
      {
        label: `Gallery`,
        link: `/gallery`,
      },
      {
        label: `Contact`,
        link: `/contact`,
      },
    ],
    [],
  );

  return (
    <div className={classes.root}>
      <Head>
        <title>Oztoca - {title}</title>
        <meta name="description" content={description} />
        {tags?.map(({ name, content }) => (
          <meta key={name} name={name} content={content} />
        ))}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header links={NavLinks} />
      <main
        style={{
          width: `100%`,
          flexGrow: 2,
          background: `#efebeb`,
          overflow: `hidden`,
        }}
      >
        {children}
      </main>
      <Footer links={NavLinks} />
    </div>
  );
};

export default Layout;
