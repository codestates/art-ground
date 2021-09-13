import styles from "./Google.module.css";

import React from "react";

const Google = (props) => {
  return (
    <section className={styles.container}>
      <div>
        <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/signin&client_id=712078359002-ms5bo3h03tenocjb8sib9mdq6q46jdet.apps.googleusercontent.com">
          구글
        </a>
      </div>
    </section>
  );
};

export default Google;
