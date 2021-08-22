import React from "react";
import "./SocialItem.css";

const SocialItem = ({ icon, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`static-social-link`}
    >
      {icon}
    </a>
  );
};

export default SocialItem;
