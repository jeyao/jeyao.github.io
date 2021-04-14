import React from 'react';
import Index from '../text/index.mdx';

import Layout from './Layout';
import Seo from './SEO';

export default function Home() {
  return (
    <Layout>
      <Seo />
      <Index />
    </Layout>
  );
}
