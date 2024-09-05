import React from 'react';
import {FaInstagram, FaXTwitter, FaYoutube} from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";

const FollowOn = () => {
  return (
    <div className="faded-text pt-2">
        <span>Follow On:</span>
        <div className="flex gap-4 pt-3">
            <a href="https://www.linkedin.com/in/ananya-bhagat/">
            <FaLinkedin size={20} />
            </a>

            <a href="https://github.com/Ananyab3100">
            <IoLogoGithub size={20}/>
            </a>

            <a href="https://x.com/AnanyaB3100">
            <FaXTwitter size={20} />
            </a>

        </div>
      
    </div>
  )
}

export default FollowOn
