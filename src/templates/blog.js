import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import BlogSidebar from '../components/blogsidebar'
import Layout from "../components/layout"
import { removePre, removeSpecialSymbols } from './../util/common'
import SEO from "../components/seo";

class BlogList extends Component {
  
  render() {
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/blog" : `blog/page/${(currentPage - 1).toString()}`
    const nextPage = `blog/page/${(currentPage + 1).toString()}`
    const data = this.props.data
    // const post = data.allWordpressPost;
    //console.log(post);
    
    return (
      <Layout>
      <SEO title="Blog"/>
        <div id="page" className="site">
          <div id="content" className="site-content">
            {/* blog header */}
            <section>
              <div className="blog-header">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h1>Latest Blog</h1>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* blog posts */}
            <div id="primary" className="content-area blog-list">
              <main id="main" className="site-main">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 blog-posts-wrap">
                    {data.allWordpressPost.edges.map(({ node }) => (
                      <div key={node.id}>
                        <article id="post-{node.id}"
                        className="post-{node.id} post type-post status-publish format-standard has-post-thumbnail hentry category-design category-tips-and-tricks card">
                          <div className="row">
                            <div className="col-md-12 col-sm-12">
                              <div className="card-image">
                                <Link to={`/blog/${removePre(node.link)}`} className="post-thumbnail">
                                {node.featured_media !== null &&
                                  <img src={node.featured_media.source_url} alt="" loading="lazy" />
                                }
                                </Link>
                              </div>
                              <div className="section-desc">
                                <header className="entry-header">
                                  <h2 className="card-title entry-title">
                                    {/* <Link to={`/${removePre(node.link)}`}>{node.title}</Link> */}
                                    <Link to={`/blog/${removePre(node.link)}`}>{removeSpecialSymbols(node.title)}</Link>
                                  </h2>
                                </header>
                                <div className="card-description"
                                dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                              </div>
                              <footer className="blog-section-footer">
                                  <div className="row">
                                    <div className="col-md-8 col-sm-8">
                                      <div className="author">
                                        <div>By 
                                        <Link to={`/${removePre(node.author.link)}`} className="vcard author">
                                          <strong className="fn">
                                            {node.author !== null &&
                                            <span>  {node.author.name}</span>
                                            } 
                                          </strong>
                                        </Link>,
                                        
                                          <time> {node.date}</time>
                                        
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                      <div className="read-more-link">
                                        <Link to={`/blog/${removePre(node.link)}`}>Read More</Link>
                                      </div>
                                    </div>
                                  </div>
                                </footer>
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}
                    {/* Pagination */}
                    <div className="post-pagination">
                      <ul className="page-num">
                        {!isFirst && (
                          <li className="list-inline-item">
                            <Link to={prevPage} rel="prev" className="page-numbers">
                              <span>
                                « Previous
                              </span>
                            </Link>
                          </li>
                        )}
                        {Array.from({ length: numPages }, (_, i) => (
                          <li className="list-inline-item" key={i}>
                            <Link  className={`page-numbers ${currentPage === i+1 ? 'current': ''}`}
                            key={`pagination-number${i + 1}`} to={`/blog${i === 0 ? "/" : `/page/${i + 1}`}`}>
                              <span>
                                {i + 1}
                              </span>
                            </Link>
                          </li>
                        ))}
                        {!isLast && (
                          <li className="list-inline-item">
                            <Link to={nextPage} rel="next" className="page-numbers">
                              <span>
                                Next »
                              </span>
                            </Link>
                          </li>
                        )} 
                      </ul>
                    </div>
                    </div>
                    <div className="col-md-4 blog-sidebar-wrapper col-md-offset-0">
                      <div>
                      {/* blogpage sidebar */}
                      <aside id="secondary" className="widget-area">
                        <BlogSidebar />
                      </aside>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

}
export default BlogList


export const pageQuery = graphql`
  query($skip: Int! , $limit: Int!) {
    allWordpressPost(
        limit: $limit,
        skip: $skip,
        sort: {order: DESC, fields: date}
      ) {
      edges {
        node {
          id
          title
          slug
          date(fromNow: true)
          type
          excerpt
          link
          author {
            name
            slug
            link
          }
          featured_media {
            source_url
            author {
              name
            }
          }
          categories {
            name
          }
        }
      }
    }
  }
`
