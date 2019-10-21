  // Component in src/templates/PageTemplate.js
  import React from 'react';
  import { graphql } from 'gatsby';

  import Layout from '../layouts';

  export default ({ data }) => (
    <Layout headerTitle='title'>
      <h3>Page Template</h3>
      {JSON.stringify(data)}
    </Layout>
  );

  export const query = graphql`
    query($PageID: String!){
    nodePage(id: { eq: $PageID }) {
        id
    }
  }
`
