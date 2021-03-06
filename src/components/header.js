import React from "react"
import { graphql, Link, StaticQuery } from "gatsby";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { removePre } from './../util/common';
import { globalHistory as history } from '@reach/router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  onMouseEnter(name) {
    this.setState({ [name]: true});
  }

  onMouseLeave(name) {
    this.setState({ [name]: false});
  }
  render () {
    const {
      headernavclass,
    } = this.props;
    return (
      <StaticQuery
      query={graphql`
        query {       
          allWp {
            edges {
              node {
                themeGeneralSettings {
                  acfGeneralThemeSettings {
                    siteLogo {
                      sourceUrl
                    }
                    lightSiteLogo {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
          allWpMenuItem(filter: {menu: {node: {name: {eq: "main-menu"}}}, parentDatabaseId: {eq: 0}}) {
            edges {
              node {
                label
                url                
                childItems {
                  nodes {
                    label
                    url
                    target
                  }
                }
              }
            }
          }
        }
      `}      
      render={(data) => {
       
         const acfoptions = data.allWp.edges[0].node.themeGeneralSettings;
         const maninmenu = data.allWpMenuItem.edges;
         const darklogo = acfoptions.acfGeneralThemeSettings.siteLogo.sourceUrl;
         const lightlogo = acfoptions.acfGeneralThemeSettings.lightSiteLogo.sourceUrl;
         const companymenu = maninmenu[0];
         const servicmenu = maninmenu[1];
         const workmenu = maninmenu[2];
         const blogmenu = maninmenu[3];
         const contactmenu = maninmenu[4];
         const { location} = history
         const param = location.pathname;  
         console.log(blogmenu);
      
        const handleClicko = (el) => { 
          document.body.classList.toggle("menu-open");
          const navbarmenu = document.getElementsByClassName('mobile-view')[0];
          navbarmenu.classList.toggle('show-mob-view');

          const shwmenu = document.getElementsByClassName('navbar-collapse')[0];
          shwmenu.classList.toggle('show');
          const menudiv = document.getElementById("mobmenu");
          menudiv.classList.toggle('mobmubtn');
          if(menudiv.innerHTML === '<div></div><div></div><div></div>') {            
            menudiv.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
          }
          else  {   
            menudiv.innerHTML = "<div></div><div></div><div></div>";
          }     
        }        
        return(
          
          <header className="site-header">    
            <div className="container d-flex frex-wrap justify-content-space-between header-inner">
              <div className="site-branding">            
                {acfoptions.acfGeneralThemeSettings.siteLogo !== null && acfoptions.acfGeneralThemeSettings.lightSiteLogo !== null &&              
                  <Link to="/"><img id="main-logo" src={param === '/services/make/' ? lightlogo : location.pathname === '/services/market/' ? lightlogo : location.pathname === '/services/maintain/' ? lightlogo : location.pathname === '/' ? lightlogo : darklogo} alt="Site Logo" /></Link>                                
                }  
                {acfoptions.acfGeneralThemeSettings.siteLogo !== null &&             
                  <Link to="/"><img src={darklogo} id="dark-sticky-logo" alt="Site Logo" /></Link>                                
                } 
              </div>

              <div className="menu-wraper d-flex">
                <Navbar bg="default" expand="lg" id={headernavclass} className="mobile-view site-nav navbar d-flex justify-content-end align-items-center">
                <button id="mobmenu" className="navbar-toggler" type="button" onClick={handleClicko} data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <div></div>
                  <div></div>
                  <div></div>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="nav navbar-nav">
                    <li className="nav-item menu-item">
                    <Dropdown className="nav-item" id="basic-nav-dropdown" onMouseOver={() => this.onMouseEnter('company')} onMouseLeave={() => this.onMouseLeave('company')} isOpen={this.state.company} toggle={this.toggle}>
                      <DropdownToggle caret>{companymenu.node.label}</DropdownToggle>
                      <DropdownMenu>   
                        {companymenu.node.childItems.nodes.map((node, index) => (
                          <DropdownItem tag={Link} to={`/company/${removePre(node.url)}`} key={index}>{node.label}</DropdownItem>
                        ))}   
                      </DropdownMenu>
                    </Dropdown>
                   
                    </li>
                    <li className="nav-item menu-item">
                      <Dropdown className="nav-item" id="basic-nav-dropdown" onMouseOver={() => this.onMouseEnter('service')} onMouseLeave={() => this.onMouseLeave('service')} isOpen={this.state.service} toggle={this.toggle}>
                        <DropdownToggle caret>{servicmenu.node.label}</DropdownToggle>
                        <DropdownMenu>   
                          {servicmenu.node.childItems.nodes.map((node, index) => (
                            <DropdownItem tag={Link} to={`/services${removePre(node.url)}`} key={index}>{node.label}</DropdownItem>
                          ))}   
                        </DropdownMenu>
                      </Dropdown>                   
                    </li> 
                    <li className="nav-item menu-item">
                    <Dropdown className="nav-item" id="basic-nav-dropdown" onMouseOver={() => this.onMouseEnter('work')} onMouseLeave={() => this.onMouseLeave('work')} isOpen={this.state.work} toggle={this.toggle}>
                        <DropdownToggle caret>{workmenu.node.label}</DropdownToggle>
                        <DropdownMenu>   
                        <DropdownItem tag={Link} to={`${workmenu.node.childItems.nodes[0].target === "" ? `/${removePre(workmenu.node.childItems.nodes[0].url)}` : workmenu.node.childItems.nodes[0].url}`}>{workmenu.node.childItems.nodes[0].label}</DropdownItem>
                        <DropdownItem tag={Link} target="_blank" to={workmenu.node.childItems.nodes[1].url}>{workmenu.node.childItems.nodes[1].label}</DropdownItem>
                        <DropdownItem tag={Link} target="_blank" to={workmenu.node.childItems.nodes[2].url}>{workmenu.node.childItems.nodes[2].label}</DropdownItem>
                          
                        </DropdownMenu>
                      </Dropdown>  
                    
                    </li>
                    <li className="nav-item menu-item"><Link to={blogmenu.node.url}>{blogmenu.node.label}</Link></li>
                    <li className="nav-item menu-item"><Nav.Link href={contactmenu.node.url}>{contactmenu.node.label}</Nav.Link></li>
                    <li className="nave-item menu-item request-quote-mob"><Link to={contactmenu.node.url} className="btn-primary">Request a Quote</Link></li>
                  </ul>
                  </div>
                </Navbar>                
                </div>
            </div>  
        </header>
        )  
      }}
    />
    )
  }
}

export default Header;