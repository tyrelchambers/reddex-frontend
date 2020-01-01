import React from 'react';
import './SocialBar.scss'
import SocialItem from '../SocialItem/SocialItem';

const SocialBar = ({config}) => {
  const {
    facebook,
    instagram,
    podcast,
    patreon,
    twitter,
    youtube,
    accent
  } = config;

  return (
    <div className={`static-social-bar ${config.theme}`}>
      <div className="static-social-list">
        {facebook &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-facebook-square" style={{color: accent}}></i>}
            link={facebook}
          />
        }

        {twitter &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-twitter" style={{color: accent}}></i>}
            link={`https://twitter.com/${twitter}`}
          />
        }

        {instagram &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-instagram" style={{color: accent}}></i>}
            link={`https://instagram.com/${instagram}`}
          />
        }

        {podcast &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fas fa-podcast" style={{color: accent}}></i>}
            link={podcast}
          />
        }

        {patreon &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-patreon" style={{color: accent}}></i>}
            link={patreon}
          />
        }

        {youtube &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-youtube" style={{color: accent}}></i>}
            link={youtube}
          />
        }
      </div>
    </div>
  );
}

export default SocialBar;
