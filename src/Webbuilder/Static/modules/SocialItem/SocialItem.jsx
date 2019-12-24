import React from 'react';
import './SocialItem.scss'

const SocialItem = ({icon, link, theme}) => {
  return (
    <a href={link} className={`static-social-link ${theme}`}>
      {icon}
    </a>
  );
}

export default SocialItem;
