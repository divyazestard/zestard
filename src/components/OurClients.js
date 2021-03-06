import React, { useRef } from "react";
import Slider from "react-slick";

const OurClients = (props) => {

    const slides = useRef(null);

      const next = () => {
        slides.current.slickNext();
      }
      const previous = () => {
        slides.current.slickPrev();
      }

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
                  slidesToScroll: 2, 
                }
              },
            {
              breakpoint: 420,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2, 
              }
            }
        ]
    }; 
    
    return (
        <section>
        <div className="clients-section">
            <div className="container">
                <div className="title text-center">
                    <h2>Our Clients</h2>
                </div>
                <div className="clients-logos mob-client d-md-none d-sm-block"> 
                
                    <Slider ref={slides} {...clientlogoset}>
                        {props.clients.map((node,index) => (
                            <div key={index}>
                                {node.node.featuredImage.node !== null && node.node.featuredImage.node.sourceUrl !== null &&
                                <img src={node.node.featuredImage.node.sourceUrl} alt="c-logo-img" />
                            }
                            </div>
                        ))}
                    </Slider>                    
                </div>
                <div className="clients-logos desk-client d-md-block d-none">
                    <ul>                    
                        {props.clients.map((node,index) => (
                            <li key={index}>
                                {node.node.featuredImage.node !== null && node.node.featuredImage.node.sourceUrl !== null &&
                                    <img src={node.node.featuredImage.node.sourceUrl} alt="c-logo-img" />
                                }                                
                            </li>
                        ))}                    
                    </ul>
                </div>
            </div>
        </div>
    </section>
    )
}


export default OurClients;