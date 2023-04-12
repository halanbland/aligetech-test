import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";
import { faCommentDots, faInbox } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <div className="footer">
            <div className="footer__underline"></div>
            <div className="width ">
                <div className="footer__container">
                    <div className="footer__container-half">
                        <div className="footer__title">
                            <div className="footer__logo-wrap">
                                <div className="logo">
                                    <div className="logo__pre"></div>
                                    <div className="logo__second"></div>
                                </div>
                                <h3 className="footer__brand">DataWarehouse</h3>
                            </div>
                            <p className="footer__place">
                                Warehouse Society, 234 Bahagia Ave Street PRBW
                                29281
                            </p>
                            <p className="footer__project">
                                info@warehouse.project 1-232-3434 (Main)
                            </p>
                        </div>
                        <div className="footer__about">
                            <h4 className="footer__about-title">About</h4>
                            <ul className="footer__list">
                                <li className="footer__list-item">Profile</li>
                                <li className="footer__list-item">Features</li>
                                <li className="footer__list-item">Carreers</li>
                                <li className="footer__list-item">DW news</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__container-half">
                        <div className="footer__help">
                            <h4 className="footer__about-title">Help</h4>
                            <ul className="footer__list">
                                <li className="footer__list-item">Suppost</li>
                                <li className="footer__list-item">Sign up</li>
                                <li className="footer__list-item">Guide</li>
                                <li className="footer__list-item">Reports</li>
                                <li className="footer__list-item">Q&A</li>
                            </ul>
                        </div>
                        <div className="footer__social">
                            <h4 className="footer__about-title">Social</h4>
                            <ul className="social__list">
                                <li className="social__list-item"></li>
                                <li className="social__list-item"></li>
                                <li className="social__list-item"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer__since">
                    <p className="footer__since-title">
                        © Datawarehouse™, 2020. All rights reserved.
                        <br></br>
                        Company Registration Number: 21479524.
                    </p>
                    <div className="inbox">
                        <FontAwesomeIcon
                            className="inbox__icon"
                            icon={faCommentDots}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
