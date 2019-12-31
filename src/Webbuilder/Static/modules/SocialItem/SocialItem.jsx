import React from 'react';
import './SocialItem.scss'

const SocialItem = ({icon, link}) => {
  return (
    <a href={link} target="_blank" className={`static-social-link`} >
      {icon}
    </a>
  );
}

export default SocialItem;
