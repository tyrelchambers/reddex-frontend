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
    youtube
  } = config;

  return (
    <div className={`static-social-bar`}>
      <div className="static-social-list">
        {facebook &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-facebook-square"></i>}
            link={facebook}
          />
        }

        {twitter &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-twitter"></i>}
            link={twitter}
          />
        }

        {instagram &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-instagram"></i>}
            link={instagram}
          />
        }

        {podcast &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fas fa-podcast"></i>}
            link={podcast}
          />
        }

        {patreon &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-patreon"></i>}
            link={patreon}
          />
        }

        {youtube &&
          <SocialItem
            accent={config.accent}
            icon={<i className="fab fa-youtube"></i>}
            link={youtube}
          />
        }
      </div>
    </div>
  );
}

export default SocialBar;
