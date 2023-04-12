import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ListSlider } from "../../apis";

function Home() {
    const [slider, setslider] = useState([]);
    const [currSlider, setCurrSlider] = useState();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        async function listSlider() {
            let data = await ListSlider();
            setslider(data.data);
        }
        listSlider();
    }, []);

    useEffect(() => {
        setCurrSlider(slider[0]);
    }, [slider]);

    useEffect(() => {
        setCurrSlider(slider[index]);
    }, [index]);

    const handleNext = () => {
        if (index === slider.length - 1) {
            setIndex(0);
        } else {
            setIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (index === 0) {
            setIndex(slider.length - 1);
        } else {
            setIndex((prev) => prev - 1);
        }
    };

    // auto slider

    useEffect(() => {
        let time = setTimeout(() => {
            if (index === slider.length - 1) {
                setIndex(0);
            } else {
                setIndex((prev) => prev + 1);
            }
            setCurrSlider(slider[index]);
        }, 3000);

        return () => clearTimeout(time);
    }, [index]);
    return (
        <div className="Home">
            <div className="container">
                <div className="width">
                    <div className="slide">
                        <div className="slide__text">
                            <h1 className="slide__heading">
                                Save your data storage here.
                            </h1>
                            <div className="slide__img"></div>
                            <p className="slide__description">
                                Data Warehouse is a data storage area that has
                                been tested for security, so you can store your
                                data here safely but not be afraid of being
                                stolen by others.
                            </p>
                            <button className="btn--s home__btn">
                                Learn more
                            </button>
                        </div>
                    </div>
                    <div className="features">
                        <h2 className="features__heading">Features</h2>
                        <p className="features__description">
                            Some of the features and advantages that we provide
                            for those of you who store data in this Data
                            Warehouse.
                        </p>
                        <ul className="features__list">
                            <li className="features__list-item-wrap ">
                                <div className="features__list-item">
                                    <div className="features__list-item-bg item__1"></div>
                                    <div className="features__list-item-img img__1"></div>
                                    <div className="features__list-item-content">
                                        <h3 className="features__list-item-heading">
                                            Search data
                                        </h3>
                                        <p className="features__list-item-description">
                                            Don’t worry if your data is very
                                            large, the Data Warehoue provides a
                                            search engine, which is useful for
                                            making it easier to find data
                                            effectively saving time.
                                        </p>
                                        <div className="learn__more">
                                            <button className="btn--text">
                                                Learn more
                                            </button>
                                            <FontAwesomeIcon
                                                className="learn__more-icon"
                                                icon={faArrowRight}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="features__list-item-wrap ">
                                <div className="features__list-item">
                                    <div className="features__list-item-bg item__2"></div>
                                    <div className="features__list-item-img img__2"></div>
                                    <div className="features__list-item-content">
                                        <h3 className="features__list-item-heading">
                                            Search data
                                        </h3>
                                        <p className="features__list-item-description">
                                            Don’t worry if your data is very
                                            large, the Data Warehoue provides a
                                            search engine, which is useful for
                                            making it easier to find data
                                            effectively saving time.
                                        </p>
                                        <div className="learn__more">
                                            <button className="btn--text">
                                                Learn more
                                            </button>
                                            <FontAwesomeIcon
                                                className="learn__more-icon"
                                                icon={faArrowRight}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="features__list-item-wrap ">
                                <div className="features__list-item">
                                    <div className="features__list-item-bg item__3"></div>
                                    <div className="features__list-item-img img__3"></div>
                                    <div className="features__list-item-content">
                                        <h3 className="features__list-item-heading">
                                            Search data
                                        </h3>
                                        <p className="features__list-item-description">
                                            Don’t worry if your data is very
                                            large, the Data Warehoue provides a
                                            search engine, which is useful for
                                            making it easier to find data
                                            effectively saving time.
                                        </p>
                                        <div className="learn__more">
                                            <button className="btn--text">
                                                Learn more
                                            </button>
                                            <FontAwesomeIcon
                                                className="learn__more-icon"
                                                icon={faArrowRight}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="features__list-item-wrap ">
                                <div className="features__list-item">
                                    <div className="features__list-item-bg item__4"></div>
                                    <div className="features__list-item-img img__4"></div>
                                    <div className="features__list-item-content">
                                        <h3 className="features__list-item-heading">
                                            Search data
                                        </h3>
                                        <p className="features__list-item-description">
                                            Don’t worry if your data is very
                                            large, the Data Warehoue provides a
                                            search engine, which is useful for
                                            making it easier to find data
                                            effectively saving time.
                                        </p>
                                        <div className="learn__more">
                                            <button className="btn--text">
                                                Learn more
                                            </button>
                                            <FontAwesomeIcon
                                                className="learn__more-icon"
                                                icon={faArrowRight}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="testimonials">
                        <h2 className="testimonials__heading">Testimonials</h2>
                        <div className="testimonials__slider">
                            <FontAwesomeIcon
                                onClick={handlePrev}
                                className="testimonials-icon"
                                icon={faArrowLeft}
                            />

                            {currSlider && (
                                <div
                                    key={index}
                                    className="testimonials__content"
                                >
                                    <div className="testimonials__content-avatar">
                                        <div
                                            style={{
                                                backgroundImage: `url(${currSlider.imageUrl})`,
                                            }}
                                            className="testimonials__content-img"
                                        ></div>
                                    </div>
                                    <div className="testimonials__info">
                                        <h3 className="testimonials__info-name">
                                            John Faang
                                        </h3>
                                        <p className="testimonials__info-web">
                                            wordfaang.com
                                        </p>
                                        <p className="testimonials__info-description">
                                            {currSlider.desctiption}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <FontAwesomeIcon
                                onClick={handleNext}
                                className="testimonials-icon"
                                icon={faArrowRight}
                            />
                        </div>
                        <div className="testimonials__pagination">
                            {slider.map((item, i) => {
                                return (
                                    <span
                                        key={i}
                                        className={`testimonials__pagination-item ${
                                            i === index &&
                                            "testimonials__pagination-item--active"
                                        }`}
                                    >
                                        .
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* login */}
        </div>
    );
}

export default Home;
