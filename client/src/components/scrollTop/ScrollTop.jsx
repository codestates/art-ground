// import React from 'react';
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function ScrollTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     //setTimeout(()=>{
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     //}, 300)
//   }, [pathname]); //페이지가 전환될 때 마다

//   return null;
// }

import { Component } from "react";
import { withRouter } from "react-router";

class ScrollTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollTop);