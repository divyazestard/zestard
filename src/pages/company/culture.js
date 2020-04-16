import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import PageHeader from './../../components/page-header';
import { removePre } from './../../util/common'
import SEO from "../../components/seo";
import './../../assets/scss/index.scss'

class Culture extends Component {
  
    render() {
      const data = this.props.data
      const acfData = data.wordpressPage.acf;
      return (
        <>
          <SEO />
            <div id="page" className="site-header">
                <div id="content" className="site-content">
                    {/* page header */}
                    <PageHeader
                        headerMascot = {acfData.header_mascot}
                        headerSubText = {acfData.header_sub_text}
                        headerSectionTitle={acfData.header_section_title}
                        headerPageTitle={acfData.header_page_title}
                    />
                    {/* events */}
                    <div className="container">
                      <div className="row">
                      {/* {data.allWordpressWpCultures.edges.map(({ node }) => (
                        <div className="col-lg-4 col-md-6 col-sm-6 culture-box-wrap" key={node.id}>
                          <div className="events-wrapper card shadow-sm rounded">
                          {node.featured_media !== null && node.featured_media.source_url !== null &&
                            <div className="gallery-image" 
                            style={{backgroundImage:`url(${node.featured_media.source_url})`}}>
                              <div className="view-more">
                                <Link to={`/${removePre(node.link)}/`}>View All</Link>
                              </div>
                            </div>
                          }
                            <div className="card-body event-title">
                              <h3>{node.title}</h3>
                            </div>
                          </div>
                        </div>
                      ))} */}
                      </div>
                    </div>
                </div>
            </div>
        </>
        )
  }

}
export default Culture

export const query = graphql`
{
  wordpressPage(wordpress_id: {eq: 169}) {
    title
    acf {
      header_page_title
      header_sub_text
      header_section_title
      header_mascot {
        source_url
      }
    }
  }
  
}
`