import React from 'react';
import './SocialItem.scss'

const SocialItem = ({icon, link, accent}) => {
  return (
    <a href={link} className={`static-social-link`} style={{color: accent}}>
      {icon}
    </a>
  );
}

export default SocialItem;
