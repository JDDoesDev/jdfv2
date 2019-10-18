const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

const envFile = `.env.${process.env.NODE_ENV}`

if (fs.existsSync(envFile)) {
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  })
}

module.exports = {
  siteMetadata: {
    title: `${process.env.SITE_NAME}`,
    domain: `${process.env.PROJECT_URL}`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-glamor`,
    {
      resolve: 'gatsby-theme-drupal',
      options: {
        baseUrl: `${process.env.DRUPAL_HOST}`,
        apiBase: 'api',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-embed-video',
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
          {
            resolve: 'gatsby-remark-embed-gist',
            options: {
              includeDefaultCss: true,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              withWebp: true,
              maxWidth: 790,
              linkImagesToOriginal: false,
              quality: 70,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '>',
              aliases: {},
              showLineNumbers: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: `${process.env.TRACKING_ID}`,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Josefin+Sans:300,400,700',
          'Signika:100,300,400,700', // you can also specify font weights and styles
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
