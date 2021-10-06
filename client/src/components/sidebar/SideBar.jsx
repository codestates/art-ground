import styles from "./SideBar.module.css";

import React from "react";
import { useHistory } from "react-router";

const SideBar = () => {
  const history = useHistory();
  return (
    <section className={styles.container}>
      <div>
        <img
          src="https://images.velog.io/images/beablessing/post/121ff7cb-fa14-4378-9d4e-a076ebcafd89/outline_app_registration_black_24dp.png"
          alt="등록아이콘"
        ></img>
        <span
          onClick={() => {
            history.push("/register");
          }}
        >
          전시등록하러가기
        </span>
      </div>
    </section>
  );
};

export default SideBar;
