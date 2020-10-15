const path = require("path")
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {

  const {createRedirect} = actions
  

  let response = await graphql(`
  query redirects {
    allWordpressAcfOptions {
      edges {
        node {
          options {
            wordpress_301_redirects {
              request_url
              destination_url
            }
          }
        }
      }
    }
  }`)  
    

 let data = response.data.allWordpressAcfOptions.edges[0].node.options.wordpress_301_redirects.forEach(redirect => {
   
    createRedirect({ 
      fromPath: `${redirect.request_url}`, 
      toPath: `${redirect.destination_url}`, 
      isPermanent: true 
    });
  })
  const { createPage } = actions
  const result = await graphql(`
    {
      allWordpressPost(sort: {order: DESC, fields: date}) {
        edges {
          node {
            id
            slug
            status
            date
            excerpt
            categories {
              slug
              name
            }
          }
        }
      }
      allWordpressWpUsers {
        edges {
          node {
            name
            slug
          }
        }
      }  
      allWordpressWpCulture {
        edges {
          node {
            title
            slug
            id
            wordpress_id
            featured_media {
              source_url
            }
          }
        }
      }
      allWordpressPage {
        edges {
          node {
            slug
            title
            path
            wordpress_id
          }
        }
      }
    }
  `)

  const { allWordpressPost,  
          allWordpressWpUsers, allWordpressWpCulture,
          allWordpressPage} = result.data

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const CategoryPostsTemplate = path.resolve(`./src/templates/categoryPosts.js`)
  const AuthorPostsTemplate = path.resolve(`./src/templates/authorPosts.js`)
  const BlogEventTemplate = path.resolve(`./src/templates/blogEvent.js`)
  const postTemplate = path.resolve(`./src/templates/blogpost.js`)
  const BlogPosts = path.resolve(`./src/templates/blog.js`)

  // Creating pages for Services

  allWordpressPage.edges.forEach(edge => {
    const removePre = (url) => {
      var path = url.replace (/^[a-z]{5}:\/{2}[a-z]{1,}\.[a-z]{3}.(.*)/, '$1');
      const newUrl = path.substr(path.indexOf('/', 7) + 1)
      return newUrl;
    }
  })

  // Creating pages for blog posts

  allWordpressPost.edges.forEach(edge => {
    createPage({
      path: `/blog/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
        cat: edge.node.categories[0].slug
      },
    })
  })

  // Creating pages for Author posts

  allWordpressWpUsers.edges.forEach(edge => {
    createPage({
      path: `/author/${edge.node.slug}/`,
      component: slash(AuthorPostsTemplate),
      context: {
        slug: edge.node.slug,
      },
    })
  })

  // creating pages for blog events

  allWordpressWpCulture.edges.forEach(edge => {
    createPage({
      path: `/culture/${edge.node.slug}/`,
      component: slash(BlogEventTemplate),
      context: {
        id: edge.node.wordpress_id,
      },
    })
  })
  
  // Pagination for blog posts page

  const posts = allWordpressPost.edges
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: slash(BlogPosts),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    });
  }); 

}

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
