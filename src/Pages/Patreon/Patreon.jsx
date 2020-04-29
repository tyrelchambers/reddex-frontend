import React from 'react';
import './Patreon.scss'
import {basic, pro} from './patreons'
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import { MainButton } from '../../components/Buttons/Buttons';
import HR from '../../components/HR/HR';

const Patreon = () => {
  return (
    <DisplayWrapper>
      <div className="patreon-wrapper container center d-f fxd-c ai-c">
        <h1 className="mt+ ta-c">Reddex Patrons!</h1>
        <p className="subtle ta-c mt- center"> Reddex is a free platform that operates on the generosity of Patrons.</p>
        <p className="subtle ta-c mt- center">I want to thank each and everyone of these patrons for their support in the development of Reddex. Supporting Reddex financially doesn't come with any fancy benefits, but it does come with my sincere and greatest thanks.</p>
        <p className="subtle ta-c mt- center"> They make it possible for Reddex to continue helping Youtube Narrators work more efficiently. Thank you to everyone who uses and financially support this website.</p>

        <h3 className="mt+">Would you like to support Reddex?</h3>
        <MainButton
          value="Choose a tier"
          className="btn btn-primary mt-"
          onClick={() => window.location.href="https://www.patreon.com/reddex"}
        />
        <HR classes="mt+ mb+"/>
        <h2 className="mt+">Pro Supporters $20</h2>

        {pro.length > 0 &&
          <div className="patron-list mt+">
            {pro.map((x, id) => (
              <p className="patron">{x}</p>
            ))}
          </div>
        }

        {pro.length === 0 &&
          <p className="ta-c mt+">No pro patrons, yet!</p>
        }

        <h2 className="mt+">Supporters $10</h2>
        {basic.length > 0 &&
          <div className="patron-list mt+">
            {basic.map((x, id) => (
              <p className="patron">{x}</p>
            ))}
          </div>
        }

        {basic.length === 0 &&
          <p className="ta-c mt+">No patrons, yet!</p>
        }
        
      </div>
    </DisplayWrapper>
  );
}

export default Patreon;