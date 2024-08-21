import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Responsive({ content }) {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        // slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 8000,
        // cssEase: "linear",
        pauseOnHover: false,
        arrows: false,

    };
    return (
        <div className="slider-container ">
            <Slider {...settings} autoplay={true}>
                {content.map((i, index) => (
                    <div>
                        <div className='text-center w-[90vw] bg-gray-100 p-[50px] md:p-[50px] max-w-[800px]  rounded-[20px]' style={{ top: '0', bottom: '0', margin: 'auto' }}>
                            <img src={i.url} className="relative left-0 right-0 mx-auto h-[150px] w-[150px] object-cover object-center rounded-full mb-5" alt="" />
                            <p className='italic text-black' dangerouslySetInnerHTML={{ __html: i.paragraph }}></p>
                            <br />
                            <h4 className='font-bold italic text-black'>{i.title}</h4>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}


export default Responsive;
