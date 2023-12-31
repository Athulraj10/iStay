import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="footer-area section-gap bg-footerColor bottom-0 ">
        <div className=" mx-auto">
          <div>
            <div className="w-full ">
              <div className="single-footer-widget">
                <h6 className="text-white p-3  text-center">About Us</h6>
                <p className="text-white   pb-7 text-center">
                  Istay is your ultimate destination for accessing a wide range
                  of hostels provided in your specific needs.We offers you a the best and affordable hostel in the specific range
                </p>
              </div>
            </div>

            <div className="w-full">
              <div className="single-footer-widget">
                <p className="text-white text-center">Let us be social</p>
                <div className="footer-social flex items-center pb-12 justify-center">
                  <a
                    href="https://www.instagram.com/athul_rajk_/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-white m-2" size={24} />
                  </a>
                  <a
                    href="https://wa.me/9544642360"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="text-white m-2" size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/athul-rajk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-white m-2" size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom flex justify-center items-center flex-wrap"></div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
