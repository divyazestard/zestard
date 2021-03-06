import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "./../components/layout"
import SEO from "../components/seo";
import Header from "./../components/header";
import PageHeader from './../components/page-header';
import Testimonials from '../components/TestiMonials';
import axios from 'axios'

const validEmailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
//const validPhoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      status: "",
      fullname: null,
      email: null,
      phone: null,
      subject: null,
      message: null,
      errors: {
        fullname: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      }
    };
  }

  allFieldsValid() {        
    const fields = ['fullname','email','phone','subject','message'];       
    const errors = {};        
    fields.forEach((field) => {
      const value = this.state[field];       
      if (!value || value === '') {
        errors[field] = "This field cannot be blank.";
      }            
      if (field === "email") {
        if(!value || value === '') {
          errors.email = "This field cannot be blank.";
        } else if (!value.match(validEmailRegex)) {
          errors.email = "Please enter a valid email address";
        } 
      }
      // if (field === "phone") {
      //   if(!value || value === '') {
      //     errors.phone = "This field cannot be blank.";
      //   } 
      //   else if (!value.match(validPhoneRegex)) {
      //     errors.phone = "Phone is invalid";
      //   }
      // }
    });      
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      console.log(value);
      this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.allFieldsValid()) {
      const { fullname, email, phone, subject,message } = this.state;
      axios.post('https://phptasks.com/zestard-mmm/wp-json/zestard/v1/contact', {
        'fullname': fullname,
        'email': email,
        'phone': phone,
        'subject': subject,
        'message': message  
      })
      .then((response) => {            
        this.setState({
          submitted: true,
          status: "Thank you. We've received your Inquiry. We'll get back to you soon."
        });
      })
      .catch((error) => {
        console.log("error---"+error);
      });
    } else {
      this.setState({
        submitted: false,
        status: "There was a problem with your submission. Errors are marked below."
      });
    }
  }


  render() {
    const data = this.props.data
    const seodata = data.allWpPage.edges[0].node.seo;
    const bannerdata = data.allWpPage.edges[0].node.acfHeader;
    const testimonial = data.allWpCptuiTestimonial.edges;
    
    return (
      <Layout>
        <SEO title={seodata.title} />
          <Header headernavclass="lightheader" />
          <div id="page" className="site-page contact-us">
            {/* page header */}
            <PageHeader
              headerMascot = {bannerdata.headerMascot.sourceUrl}
              headerSubText = {bannerdata.headerSubText}
              headerSectionTitle={bannerdata.headerSectionTitle}
              headerPageTitle={bannerdata.headerPageTitle}
            />
         
            <div className="contact-wrapper">
                <div className="container">
                    <div className="contact-form">
                      {/* <h2 className="title">Talk to Ecommerce Experts</h2> */}
                      <h3 className={this.state.submitted === true ? 'mail-send' : this.state.submitted === false ? 'mail-failed' : '' } >{this.state.status}</h3>
                        <div className="form-wrap">
                          {this.state.submitted === false && 
                            <form method="post" action="#" className="frm_forms" onSubmit={this.handleSubmit} noValidate>
                              <div className="form-field">
                                <label>Full Name</label>
                                <input type="text" name="fullname" id="fullname"  className="form-control" placeholder="eg. John Doe" onChange={this.handleChange} noValidate/>
                                  {this.state.errors.fullname && 
                                      <span className='error'>{this.state.errors.fullname}</span>
                                  }
                              </div>
                              <div className="form-field">
                              <label>Email</label>
                                <input type="email" name="email" id="email"  className="form-control" placeholder="eg. john@corporate-email.com" onChange={this.handleChange} noValidate />
                                  {this.state.errors.email && 
                                      <span className='error'>{this.state.errors.email}</span>
                                  }
                              </div>
                              <div className="form-field">
                              <label>Phone</label>
                                <input type="text" name="phone" id="phone"  className="form-control" placeholder="eg. 63957 15773" onChange={this.handleChange} />
                                  {this.state.errors.phone && 
                                      <span className='error'>{this.state.errors.phone}</span>
                                  }
                              </div>
                              <div className="form-field">
                              <label>Subject</label>
                                <input type="text" name="subject" id="subject"  className="form-control" placeholder="eg. redesign website" onChange={this.handleChange} />
                                  {this.state.errors.subject && 
                                      <span className='error'>{this.state.errors.subject}</span>
                                  }
                              </div>
                              <div className="form-field">
                              <label>Message</label>
                                <textarea name="message" id="message" rows="5" className="form-control" placeholder="Your message here" onChange={this.handleChange} noValidate ></textarea>
                                  {this.state.errors.message && 
                                      <span className='error'>{this.state.errors.message}</span>
                                  }
                              </div>
                              <div className="form-field">
                                <button className="btn-primary" type="submit">Send</button>
                              </div>
                            </form>
                          }

                        </div>  
                        </div>
                    </div>

                    {/* Testimonials section */}
                  <Testimonials testimonial={testimonial} />
                  </div>

                </div>
      </Layout>
    )
  }

}
export default Contact

export const query = graphql`
{
  
  allWpCptuiTestimonial {
    edges {
      node {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
  allWpPage(filter: {databaseId: {eq: 7808}}) {
    edges {
      node {
        title
        seo {
          title
          metaDesc
        }
        acfHeader {
          headerPageTitle
          headerSectionTitle
          headerSubText
          homeMascotClass
          headerMascot {
            sourceUrl
          }
        }
      }
    }
  }
}
`