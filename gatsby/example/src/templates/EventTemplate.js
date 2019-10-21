
  // Component in src/templates/EventTemplate.js
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
  query($EventID: String!){
  nodeEvent(id: { eq: $EventID }) {
      id
    }
}
`
