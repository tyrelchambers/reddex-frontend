import React from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import './OverviewOptions.scss'

const OverviewOptions = ({OverviewStore}) => {

  const Modules = ({data}) => (
    <div className="overview-module d-f ai-c" onClick={() => {
      OverviewStore.setModule(data.key, !OverviewStore[data.key].enabled)
    }}>
      <p>{data.label}</p>
      <input type="checkbox" name="module" id={data.label}/>
    </div>
  )

  return (
    <div className="quick-actions">
      <h5 className="mb--">Home Modules</h5>
      <div className="d-f ai-c">
        {OverviewStore.getModules().map((x, id) => (
          <Modules data={x} key={id}/>
        ))}
      </div>
    </div>
  );
}



export default inject("OverviewStore")(observer(OverviewOptions));
