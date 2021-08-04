import React, { useEffect } from "react";
import DashboardNav from "../../layouts/DashboardNav/DashboardNav";
import "./Dashboard.scss";
import Loading from "../../components/Loading/Loading";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { getAxios } from "../../api";
import Header from "../../layouts/Header/Header";

const Dashboard = inject(
  "FormStore",
  "UserStore",
  "SiteStore",
  "ReadingListStore"
)(
  observer(
    ({
      loading,
      children,
      UserStore,
      SiteStore,
      FormStore,
      ReadingListStore,
    }) => {
      useEffect(() => {
        const yt = UserStore.currentUser.youtube_id;

        const fn = async () => {
          await getAxios({
            url: "/site/config",
          }).then((res) => {
            if (res) {
              SiteStore.setInitial({
                ...res,
                youtube_id: res.youtube_id || yt,
              });
              SiteStore.setPreview({ subdomain: res.subdomain });
              FormStore.setOptionsId(res.SubmissionFormOption.uuid);
              SiteStore.setActivated(true);
            }
          });

          await getAxios({
            url: "/patreon/getUserIdentity",
          }).then((res) => {
            if (res) {
              UserStore.setPatron(res);
            }
          });
        };
        getAxios({
          url: "/profile/reading_list?permission=true",
        }).then((res) => {
          if (res) {
            ReadingListStore.addToRead(res.stories);
          }
        });

        fn();
      }, []);

      return (
        <div className="d-f fxd-c dashboard-wrapper">
          <Header />
          <DashboardNav />

          {loading && <Loading />}

          {!loading && (
            <main className={`p+ dashboard-page-wrapper `}>
              <div className="container">{children}</div>
            </main>
          )}
        </div>
      );
    }
  )
);

export default Dashboard;
