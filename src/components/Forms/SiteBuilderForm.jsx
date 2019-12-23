import React from 'react';
import HR from '../HR/HR';

const SiteBuilderForm = ({config, configHandler}) => {
  return (
    <form className="form ">
      <div className="field-group">
        <label htmlFor="subdomain" className="form-label">Subdomain</label>
        <div className="d-f ai-c multi-input">
          <span className="preffix">https://</span>
          <input type="text" className="form-input fx-1" name="subdomain" value={config.subdomain} onChange={e => configHandler(e)}/>
          <span className="suffix">.reddex.app</span>
        </div>
        {config.subdomain &&
          <p className="subtle mt-">https://{config.subdomain}.reddex.app</p>
        }
      </div>

      <div className="field-group">
        <label htmlFor="title" className="form-label">Site Title</label>
        <div className="d-f ai-c multi-input">
          <span className="preffix">
            <i className="fas fa-id-badge"></i>
          </span>
          <input type="text" className="form-input fx-1" name="title" value={config.title} placeholder="My Awesome Site" onChange={e => configHandler(e)}/>
        </div>
      </div>

      <HR
        classes="mt+ mb+"
      />

      <h2 className="mb-">Social Media</h2>
      <p className="subtle">The links below will appear as social icons on your site. These are not required, and the icons will not appear on your site if you leave them blank.</p>

      <div className="field-group">
        <label htmlFor="twitter" className="form-label">Twitter</label>
        <div className="d-f ai-c multi-input">
          <span className="preffix">@</span>
          <input type="text" className="form-input fx-1" name="twitter" value={config.twitter} placeholder="twitter handle" onChange={e => configHandler(e)}/>
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="instagram" className="form-label">Instagram</label>
        <div className="d-f ai-c multi-input">
          <span className="preffix">@</span>
          <input type="text" className="form-input fx-1" name="instagram"  value={config.instagram} placeholder="instagram handle" onChange={e => configHandler(e)}/>
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="facebook" className="form-label">Facebook URL</label>
        <div className="d-f ai-c multi-input">
          <span className="preffix">
            <i className="fab fa-facebook-f"></i>
          </span>
          <input type="text" className="form-input fx-1" name="facebook"  value={config.facebook} placeholder="https://facebook.com/mypage" onChange={e => configHandler(e)}/>
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="patreon" className="form-label">Patreon URL</label>
        <div className="d-f ai-c multi-input">
          <span className="preffix">
            <i className="fab fa-patreon"></i>
          </span>
          <input type="text" className="form-input fx-1" name="patreon" value={config.patreon}  placeholder="https://patreon.com/mypage" onChange={e => configHandler(e)}/>
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="youtube" className="form-label">Youtube Channel ID</label>
        <div className="d-f ai-c multi-input">
          <span className="preffix">
            <i className="fab fa-youtube"></i>
          </span>
          <input type="text" className="form-input fx-1" name="youtube" value={config.youtube}  placeholder="https://youtube.com/c/channelId" onChange={e => configHandler(e)}/>
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="podcast" className="form-label">Podcast</label>
        <div className="d-f ai-c multi-input">
          <span className="preffix">
            <i className="fas fa-podcast"></i>
          </span>
          <input type="text" className="form-input fx-1" name="podcast" value={config.podcast}  placeholder="Link to your podcast" onChange={e => configHandler(e)}/>
        </div>
      </div>
    </form>
  );
}

export default SiteBuilderForm;
