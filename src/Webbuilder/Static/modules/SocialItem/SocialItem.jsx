import React from 'react';
import './SocialItem.scss'

const SocialItem = ({icon, link, accent}) => {
  return (
    <a href={link} target="_blank" className={`static-social-link`} style={{color: accent}}>
      {icon}
    </a>
  );
}

export default SocialItem;
