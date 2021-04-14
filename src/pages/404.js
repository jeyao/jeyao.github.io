import React from 'react';
import { Link } from 'gatsby';

import Layout from '../@rocketseat/gatsby-theme-docs/src/components/Layout';
import Seo from '../@rocketseat/gatsby-theme-docs/src/components/SEO';

export default function NotFound() {
  return (
    <Layout title="Page not found!">
      <Seo title="404: Not found" />
      <p>天哪，没找到你要找的网页</p>
      <p>
        如果你想回到首页，请 <Link to="/">click here</Link>。
      </p>
    </Layout>
  );
}
