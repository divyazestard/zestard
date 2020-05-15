import React, { Component } from "react"
import Layout from "./../../components/layout"
import SEO from "./../../components/seo"
import AboutProject from './../../components/aboutproject'

class EcommerceDevelopment extends Component {

	render() {		
		return(
			<Layout>
				<SEO title="E-commerce Development"/>
				
				<section>
					<AboutProject />				
				</section>
	  </Layout>
		)
	}

}

export default EcommerceDevelopment