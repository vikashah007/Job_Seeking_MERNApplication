import React, { useContext } from 'react'
import {FaFacebookF,FaYoutube,FaLinkedin,FaTelegramPlane } from "react-icons/fa"
import {RiInstagramFill} from "react-icons/ri"
import { Context } from '../../main'
import { Link } from 'react-router-dom'


const Footer = () => {
  const {isAuthorised}=useContext(Context)
  return (
    <footer className={isAuthorised ? "footerShow" :"footerHide"}>
         <div>&copy; All Rights Are Reserved With Vikash </div>
         <div>
            <Link to={"https://www.facebook.com/vikash.a.568"} target='_blank'><FaFacebookF/></Link>
            <Link to={"https://telegram.org/dl"} target='_blank'><FaTelegramPlane/></Link>
            <Link to={"https://www.linkedin.com/in/vikash-kumar-shah-80265a233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app&original_referer="} target='_blank'><FaLinkedin/></Link>
            <Link to={"https://www.instagram.com/vikashah007/?igshid=NGExMmI2YTkyZg%3D%3D"} target='_blank'><RiInstagramFill/></Link>
         </div>      
    </footer>
  )
}

export default Footer
