  // Component in src/templates/BlogPostTemplate.js
  import React from 'react'
  import { graphql } from 'gatsby'
  import Img from 'gatsby-image'
  import ReactHtmlParser from 'react-html-parser';

  import Layout from '../layouts'

  const BlogPostTemplate = ({ data }) => {

    const blogBody = data.nodeBlogPost.body.processed

    let blogBodyElements = new ReactHtmlParser(blogBody, {
      transform: function transform(node) {
        if (node.type === 'tag' && node.attribs['data-entity-embed-display'] === 'media_image') {
          let id = node.attribs["data-entity-uuid"];
          let i = 0;
          for (i = 0; i < data.allMediaImage.nodes.length; i++) {
            if (data.allMediaImage.nodes[i].drupal_id === id &&
              data.allMediaImage.nodes[i].relationships.image.localFile) {
                console.log(data.allMediaImage.nodes[i].drupal_id)
              return <Img key={i} fluid={data.allMediaImage.nodes[i].relationships.image.localFile.childImageSharp.fluid}/>
            }
          }
        }
        else {
          return undefined
        }
      }
    })

    return <Layout headerTitle='title'>
      <h3>Page Template</h3>
      {blogBodyElements}
    </Layout>
  }

  export default BlogPostTemplate

  export const query = graphql`
  query($BlogPostID: String!){
  nodeBlogPost(id: { eq: $BlogPostID }) {
    id
    body {
      processed
    }
    relationships {
      field_header_image_entity {
        relationships {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
  allMediaImage {
    nodes {
      name
      id
      drupal_id
      relationships {
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`
