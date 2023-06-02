import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './common.css';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Pagination } from "swiper";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ShowList = () => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        fetch("https://api.tvmaze.com/search/shows?q=all")
            .then(response => response.json())
            .then(data => setShows(data))
            .catch(error => console.log(error));
    }, []);
    return (

        <div>
            <div id="banner-showlist">
                <Container>
                    <h1 className="text-white">Watch Amazing Tv Shows</h1>
                    <p className="text-white text-lg w-80">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque aspernatur nulla inventore dignissimos quia. Dolores fugit optio quas ut.</p>
                    <div>
                        <button className="btn btn-danger me-2">Buy Shows</button>
                        <button className="btn btn-danger">Watch Shows</button>
                    </div>
                </Container>
            </div>
            <div className="py-5">
                <h1 className="fs-3 fw-semibold mb-3 text-center"><span className="m-5"><FaArrowLeft size={23}/></span>OUR <span className="text-danger">TV SHOWS</span><span className="m-5"><FaArrowRight size={23}/></span></h1>
                <Swiper id="swiper-cursor-style"
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <div>
                        <ul>
                            {shows.map(show => (
                                <SwiperSlide key={show.show.id}>

                                    <div><img style={{ height: '340px', position: 'relative' }} src={show.show?.image?.original} alt="" />
                                    <div className="absolute top-0 bg-light py-1 text-center text-danger" style={{position: 'absolute', width: '70%', borderRadius: '20px', marginLeft: '10px', marginTop: '10px'}}>{show.show.name}</div>
                                    </div>
                                    <Link id="show-details-btn" className="bg-danger text-white fs-6 px-3 py-1" style={{top: '-15px', borderRadius: '5px', backgroundColor: 'red', position: 'relative', textDecoration: 'none', width: '100%'}} to={`/show/${show.show.id}`}>
                                        Show Details
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </ul>
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default ShowList;