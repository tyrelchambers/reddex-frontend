import React, { useState } from 'react';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import './PricingPage.scss'
import { MainButton } from '../../components/Buttons/Buttons';

const PricingPage = () => {
  const [ monthly, setMonthly ] = useState(false);

  const tiers = {
    "Basic": {
      "price": monthly ? 20 : 16,
      "perks": [
        "Reddit inbox sorting",
        "Story reading list",
        "Site builder",
        "Contact list"
      ]
    }
  }

  const TermSwitch = () => {
    return Object.keys(tiers).map((k, id) => (
      <div key={id} className="pricing-block">
          <div className="pricing-block-header p-">
            <h2>{k}</h2>
            <p className="mt- mb-">
              <span className="pricing-value">{tiers[k].price}</span>
              /month
            </p>
            {monthly &&
              <p>${tiers[k].price * 12} per year</p>
            }
            {!monthly &&
              <p>${tiers[k].price * 12} billed yearly</p>
            }
          </div>

          <div className="pricing-block-perks">
            <ul className="perk-list">
              {tiers[k].perks.map((x, id) => (
                <li className="perk d-f ai-c">
                  <i className="fas fa-check mr-"></i>
                  <p>{x}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="pricing-actions">
            <MainButton
              value="Try for free"
              className="btn btn-primary w-100pr"
            >

            </MainButton>
          </div>
        </div>
    )) 
  }

  return (
    <DisplayWrapper >
      <section className="pricing-wrapper d-f fxd-c ai-c jc-c">
        <h2 className="mb+ ta-c">Our pricing will help make your job easier, without breaking the bank.</h2>
        <div className="highlight tag d-f ai-c">
          <i className="fas fa-thumbs-up mr-"></i>
          <p className="subtle">14-day free trial. Cancel anytime.</p>
        </div>

       <div className="term-wrapper d-f fxd-c ai-c">
          <div className="term-switch-buttons d-f m+">
            <div className={`term-item ${monthly ? "active" : ""}`} onClick={() => setMonthly(true)}>
              <h3>Monthly</h3>
            </div>

            <div className={`term-item ${!monthly ? "active" : ""}`} onClick={() => setMonthly(false)}>
              <h3>Yearly</h3>
            </div>
          </div>
        <div className="d-f w-100pr jc-c mt+">
          <TermSwitch />
        </div>
       </div>
      </section>
    </DisplayWrapper>
  );
}

export default PricingPage;
