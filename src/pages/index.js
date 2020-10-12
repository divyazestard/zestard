import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header";
import SEO from "../components/seo";
import Testimonials from '../components/TestiMonials';
import Credentails from '../components/Credentails';
import OurClients from "../components/OurClients";
import Slider from "react-slick";
import Counterbg from "../images/counter-bg.png"
import { removePre } from './../util/common'
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Home extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
      }
      next() {
        this.slider.slickNext();
      }
      previous() {
        this.slider.slickPrev();
      }

    render() {
        const data = this.props.data  
        const header = data.allWordpressPage.edges[0].node.acf;
        const clientlogo = data.allWordpressWpClients.edges;
        
        const expertise = header.home_content_modules_page[0];
        const counter = data.wordpressAcfOptions.options;
        const testimonial = data.allWordpressWpTestimonials.edges;
        const credential = header.gen_content_modules_page[3].cred_logos_repeater;
        const recentpost = data.allWordpressPost.edges;
        const portfolio = data.allWordpressWpPortfolio.edges;
    

        var clientlogoset = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 500,
            slidesToShow: 3,
            arrow: false,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1, 
                    }
                  },
                {
                  breakpoint: 420,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1, 
                  }
                }
            ]
        }; 
          
  return(
  <Layout>
    <SEO title="Home" />
    {/* banner-section  */}
    <Header headernavclass="lightheader" />
    <section>
        <div className="page-banner home">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 baner-content-wrap d-flex align-items-center flex-wrap">        
                       <div className="baner-content">
                        <h1 dangerouslySetInnerHTML={{ __html: header.header_section_title }} />
                            <p>{header.header_sub_text}</p>
                       </div>
                    </div>
                    <div className="col-md-6 banner-image-wrap text-right">
                        <div className="banner-image">
                            {header.header_mascot.source_url !== null &&
                                <img src={header.header_mascot.source_url} alt="banner-img" />
                            }       
                        </div>                 
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Services-section */}
    <section>
        <div className="our-service">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="title">
                            <h2>{header.gen_content_modules_page[0].pis_section_title}</h2>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <p>{header.gen_content_modules_page[0].pis_content}</p>
                    </div>
                </div>
                <div className="services-inner">
                    <div className="card-deck">  
                    {header.gen_content_modules_page[1].cs_cards_details.map((node,index) => (                           
                        <div className="card" key={index}>  
                            {node.cs_icon !== null &&
                                <img className="card-img-top" src={node.cs_icon.source_url} alt="service-img"></img>                              
                            }                            
                            <div className="card-body">
                                <h5 className="card-title">{node.cs_title}</h5>
                                <div className="card-text" dangerouslySetInnerHTML={{ __html: node.cs_content }} ></div>
                                <Link to={`/services/${removePre(node.cs_learn_more_link)}`} className="l-more">Read More</Link>
                            </div>
                        </div>                        
                    ))} 
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Portfolio-section */}
    <section>
        <div className="recent-work portfolio">
            <div className="container">
                <div className="title text-left">
                    <h2>Our Portfolio</h2>
                </div>
                <div className="portfolio-list">
                    <div className="row">
                        {portfolio.map((node,index) => (
                            <div className={node.node.title === "Jadeblue" ? 'col-md-12 full-col' : 'col-md-6 half-col'} key={index}>
                                <div className="portfolio-wrap">
                                    <div className="portfolio-image">
                                        {node.node.acf.pf_image_with_responsive.source_url !== null &&
                                            <img src={node.node.acf.pf_image_with_responsive.source_url} alt={node.node.title} />
                                        }                                    
                                    </div>
                                    {/* <div className="portfolio-content">
                                        <span className="sub-title">Web Platform</span>
                                        <h2 className="portfolio-title">{node.node.title}</h2>
                                        <p dangerouslySetInnerHTML={{ __html: node.node.excerpt }} />
                                        <Link to="#" className="portfolio-link">Read more</Link>
                                    </div> */}
                                </div>
                            </div>
                        ))}                   
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Clients-section */}
    <OurClients clients={clientlogo} />
    {/* expertise-section */}
    <section>
        <div className="expertise-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="title">
                            <h2>{expertise.home_oe_section_title}</h2>
                            <p>{expertise.home_oe_content}</p>
                            <Link to={`/services/${removePre(expertise.home_oe_read_more_link)}`} className="btn r-more">read more</Link>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="experience-wrap">
                            <ul>
                                {expertise.home_oe_right_icons.map((node,index) => (
                                    <li key={index}>
                                        {node.home_oe_icons.source_url !== null &&
                                        <Link to={`/${removePre(node.home_oe_rp_links)}`}><img src={node.home_oe_icons.source_url} alt="f-logo-img" /></Link>
                                        }                                        
                                    </li>
                                ))}                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div className="counter-section" style={{backgroundImage:`url(${Counterbg})`}}>
            <div className="container">
                <div className="counter-wraper">
                    <ul className="row">
                        {counter.cs_counter_details.map((node,index) => (
                            <li className="box" key={index}>
                                <h2>{node.cs_number}<span>+</span></h2>
                                <p>{node.cs_label}</p>
                            </li>
                        ))}                        
                    </ul>
                </div>
            </div>
        </div>
    </section>
    {/* Testimonials section */}
    <Testimonials testimonial={testimonial} />

    {/* Credentials section */}
    <Credentails credentials={credential} slidesToShow={6} />
    
    {/* News & Blog section */}
    <section>
        <div className="news-Blog-section">
            <div className="container">
                <div className="title text-center">
                    <h2>Read Our Latest News & Blog</h2>
                </div>
                <div className="row">
                    {recentpost.map((node,index)=>(
                        <div className="col-md-6" key={index}>
                            <div className="box">
                                {(node.node.featured_media !== null && node.node.featured_media.source_url !== null) &&
                                    <img src={node.node.featured_media.source_url} alt="top-img" />
                                }
                                                             
                                <ul>
                                    <li><span><i className="fa fa-user" aria-hidden="true"></i></span>{node.node.author.name}</li>
                                    {(node.node.featured_media !== null) &&
                                        <li><span><i className="fa fa-calendar" aria-hidden="true"></i></span>{node.node.featured_media.date}</li>
                                    }
                                </ul>
                                {node.node.excerpt !== null &&
                                    <div dangerouslySetInnerHTML={{ __html: node.node.excerpt }}/>
                                }                                
                                <div className="button">
                                    <Link to={`/blog/${removePre(node.node.link)}`} className="read-more">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  </Layout>
)}}
export default Home

export const query = graphql`
{

    allWordpressWpPortfolio(filter: {tags: {elemMatch: {wordpress_id: {eq: 231}}}}) {

        edges {
          node {
            title
            excerpt
            link
            featured_media {
              source_url
            }
            acf {
              pf_image_with_responsive {
                source_url
              }
            }
          }
        }
      }
    allWordpressPage(filter: {wordpress_id: {eq: 2}}) {
        edges {
          node {
            acf {
                header_section_title
                header_page_title
                header_sub_text
                home_mascot_class
                header_mascot {
                    source_url
                }                
                gen_content_modules_page {
                    ... on WordPressAcf_gen_page_intro_section {
                        id
                        pis_section_title
                        pis_content
                        pis_section_class
                    }
                    ... on WordPressAcf_gen_cards_section {
                        id
                        cs_cards_details {
                            cs_icon {
                            source_url
                            }
                            cs_title
                            cs_content
                            cs_learn_more_link
                        }
                    }  
                    ... on WordPressAcf_gen_case_study_section {
                        id
                        css_title
                        css_content
                        css_section_class
                    }  
                    ... on WordPressAcf_gen_credential_logos {
                        id
                        cred_logos_repeater {
                          cred_logos_list {
                            source_url
                          }
                        }
                    }                
                }
                home_content_modules_page {
                    home_oe_section_title
                    home_oe_content
                    home_oe_read_more_link
                    home_oe_right_icons {
                        home_oe_rp_links
                        home_oe_icons {
                            source_url
                        }
                    }
                }
            }
          }
        }
      }
      allWordpressWpClients {
        edges {
          node {
            featured_media {
              source_url
            }
            title
          }
        }
      }
      wordpressAcfOptions {
        options {
          cs_section_class
          cs_counter_details {
            cs_label
            cs_number
          }
        }
      }
      allWordpressWpTestimonials {
        edges {
          node {
            featured_media {
              source_url
            }
            title
            content
          }
        }
      }
      allWordpressWpCredentials(sort: {order: ASC, fields: date}, filter: {acf: {hide_on_home_page: {eq: false}}}) {
        edges {
          node {
            acf {
                hide_on_home_page
            }
            featured_media {
              source_url
            }
          }
        }
      }
      allWordpressPost(sort: {order: DESC, fields: date}, limit: 2) {
        edges {
          node {
            content
            slug
            link
            excerpt
            featured_media {
              source_url
              date(formatString: "MMMM DD, YYYY")
            }
            author {
              name
            }
          }
        }
      }
}
`
