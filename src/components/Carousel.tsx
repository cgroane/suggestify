import React from "react"

interface CarouselProps {}
const Carousel = ({
  ...props
}: CarouselProps ) => {
    const items = [
        { nextItem: `#slide2`, previousItem: `#slide4`, text:`This is an app built with Node, React (although only a little), Express, Firebase, Twilio, and the Spotify Web API`,  },
        { nextItem: `#slide3`, previousItem: `#slide1`, text:`The goal is to enable users to text a number with a link to a song from Spotify and add that song to someone else's playlist`,  },
        { nextItem: `#slide4`, previousItem: `#slide2`, text:`When you click the button below, you will be directed to authorize this application with Spotify`,  },
        { nextItem: `#slide1`, previousItem: `#slide3`, text:`After you have authorized Suggestify, it will create a playlist for you in it's own name and will allow songs to be added to that playlist via text`  },
    ];
    
  return (
    <>
      <div className="h-52 my-8 carousel carousel-vertical rounded-box">
            {
                items.map((item, ind) => (
                    <div key={`item-${ind}`} className="carousel-item h-full flex flex-col justify-center relative">
                        <p id={`slide${ind+1}`} className="py-6">{item.text}</p>
                        
                        <div className={`absolute h-full flex flex-col items-center ${ind === 0 ? 'justify-end' : ind === items.length - 1 ? 'justify-start' : 'justify-between'} transform -translate-y-1/2 left-5 right-5 top-1/2`}>
                            {
                                ind !== 0 && <a href={item.previousItem} className="bg-base-300 btn btn-circle shadow-inner transition-0 rotate-180">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="#000000"/>
                                </svg>
                            </a>
                            }
                            {ind !== items.length - 1 &&
                                <a href={item.nextItem} className="bg-base-300 btn btn-circle shadow-inner">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="#000000"/>
                                </svg>
                            </a> }
                        </div>
                    </div>
                ))
            }
        </div>
    </>
  )
};

export default Carousel;
