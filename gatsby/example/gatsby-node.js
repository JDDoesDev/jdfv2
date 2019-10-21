exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  function snakeToPascal(str) {
    str += '';
    str = str.split('_');
    for (var i = 0; i < str.length; i++) {
      str[i] =
        str[i].slice(0, 1).toUpperCase() + str[i].slice(1, str[i].length);
    }
    return str.join('');
  }


  const PageTemplate = require.resolve(`./src/templates/PageTemplate.js`);
  const BlogPostTemplate = require.resolve(`./src/templates/BlogPostTemplate.js`);

  const entityTypes = await graphql(`
  {
    allNodeTypeNodeType {
      nodes {
        name
        drupal_internal__type
      }
    }
  }
`);

  const allFieldsPerType = await graphql(`
    {
      __schema {
        queryType {
          fields {
            name
            type {
              name
              fields {
                name
              }
            }
          }
        }
      }
    }
  `);

  const Page = await graphql(`{
    allNodePage {
      nodes {
        id
        path {
          alias
        }
      }
    }
  }
  `)

  const BlogPost = await graphql(`{
    allNodeBlogPost {
      nodes {
        id
        path {
          alias
        }
      }
    }
  }
  `)



  await Promise.all(
    entityTypes.data.allNodeTypeNodeType.nodes.map(async node => {
      const nodeName = snakeToPascal(node.drupal_internal__type);
      const nodeFields = allFieldsPerType.data.__schema.queryType.fields.find(
        type => type.name === `node${nodeName}`
      );
    })
  );

  Page.data.allNodePage.nodes.map(node => {
    createPage({
      path: node.path.alias,
      component: PageTemplate,
      context: {
        PageID: node.id
      }
    })
  })
  BlogPost.data.allNodeBlogPost.nodes.map(node => {
    createPage({
      path: node.path.alias,
      component: BlogPostTemplate,
      context: {
        BlogPostID: node.id
      }
    })
  })
};
