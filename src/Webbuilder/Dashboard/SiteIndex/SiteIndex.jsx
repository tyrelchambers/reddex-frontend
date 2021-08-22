import React, { useEffect, useRef } from "react";
import "./SiteIndex.css";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import SiteBuilderForm from "../../../components/Forms/SiteBuilderForm";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import ToggleStatus from "../../../components/ToggleStatus/ToggleStatus";
import { toast } from "react-toastify";
import HR from "../../../components/HR/HR";
import { MainButton } from "../../../components/Buttons/Buttons";
import tabs from "../tabs";
import { getAxios } from "../../../api/index";
import WithNav from "../../../layouts/WithNav/WithNav";
import SiteBuilderWrapper from "../../../layouts/SiteBuilderWrapper/SiteBuilderWrapper";
import {
  H1,
  H2,
  H1Subtitle,
  H2Subtitle,
} from "../../../components/Headings/Headings";

const SiteIndex = inject(
  "SiteStore",
  "FormStore"
)(
  observer(({ SiteStore, FormStore }) => {
    const pondRef = useRef();

    useEffect(() => {
      window.twttr.widgets.load(document.querySelector(".share-wrapper"));
    }, []);

    const configHandler = (e) => {
      SiteStore.setConfig({ [e.target.name]: e.target.value });
    };

    const activateSiteHandler = async () => {
      await getAxios({
        url: "/site/activate",
        method: "post",
      }).then((res) => {
        if (res) {
          SiteStore.setInitial(res.website);
          FormStore.setOptionsId(res.options.uuid);
          SiteStore.setActivated(true);
        }
      });

      toast.success("Site activated");
    };

    return (
      <Dashboard>
        <H1>Site Builder</H1>
        <H1Subtitle>Build your website and advertise what you do.</H1Subtitle>
        <WithNav
          tabs={SiteStore.activated ? tabs : []}
          optionalTabs={
            SiteStore.preview.subdomain && SiteStore.isSiteSaved
              ? [
                  <a
                    href={`https://${SiteStore.preview.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="no-underline"
                  >
                    View your site
                  </a>,
                  <div className="flex items-center share-wrapper">
                    <a
                      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                      className="twitter-share-button"
                      data-url={`https://${SiteStore.config.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`}
                      data-text={`Check out my new webpage!`}
                      data-via="ReddexApp"
                      data-hashtags="newSite"
                      data-show-count="false"
                    >
                      Tweet
                    </a>
                  </div>,
                ]
              : []
          }
        >
          <SiteBuilderWrapper>
            <div className="max-w-2xl">
              {!SiteStore.activated && (
                <div className="mt-2 flex items-center">
                  <p className="mr-2">Activate website</p>
                  <ToggleStatus
                    context="activate-site"
                    option="Activate"
                    setToggledHandler={activateSiteHandler}
                    toggled={SiteStore.activated ? true : false}
                  />
                </div>
              )}
              {SiteStore.activated && (
                <section className="site-general-wrapper">
                  <H2>General Settings</H2>
                  <div className="mt-6">
                    <SiteBuilderForm
                      configHandler={configHandler}
                      config={SiteStore.config}
                      pondRef={pondRef}
                      deleteImageHandler={SiteStore.deleteImageHandler}
                    />
                  </div>

                  <HR />

                  <H2>Danger Zone</H2>
                  <H2Subtitle>
                    This is permanent. If you delete your site, you can create
                    it again, but everything will be lost.
                  </H2Subtitle>
                  <MainButton
                    value="Delete Site"
                    className="btn btn-tiertiary danger mt-2"
                    onClick={() =>
                      SiteStore.deleteSiteHandler(SiteStore.config.uuid)
                    }
                  >
                    <i className="fas fa-trash"></i>
                  </MainButton>
                </section>
              )}
            </div>
          </SiteBuilderWrapper>
        </WithNav>
      </Dashboard>
    );
  })
);

export default SiteIndex;
