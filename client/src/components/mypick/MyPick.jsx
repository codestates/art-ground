import { useHistory } from "react-router";
import SideBar from "../sidebar/SideBar";
import styles from "./MyPick.module.css";

const MyPick = ({ el }) => {
  console.log(el, "D");
  const history = useHistory();
  const goToGallery = () => {
    history.push(`gallerydetail/${el.exhibition_id}`);
  };
  if (!el) {
    return <SideBar />;
  } else {
    return (
      <section className={styles.container}>
        <div className={styles.exBox}>
          <div className={styles.thumBox}>
            <img
              src={el.image_urls}
              alt=""
              className={styles.eximg}
              onClick={goToGallery}
            />
          </div>
          <div className={styles.infoBox}>
            <div className={styles.title} onClick={goToGallery}>
              {el.title}
            </div>
            <div className={styles.title}>{el.nickname}</div>
            <div className={styles.date}>
              <span>전시기간:</span>
              <span>{el.start_date}</span>
              <span>~</span>
              <span>{el.end_data}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default MyPick;
