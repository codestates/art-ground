import styles from "./MyPick.module.css";

const MyPick = ({ el }) => {
  //console.log(el, "라이크 데이터 ");
  return (
    <section className={styles.container}>
      <div className={styles.exBox}>
        <div className={styles.thumBox}>
          <img src={el.image_urls} alt="" className={styles.eximg} />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.title}>{el.title}</div>
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
};

export default MyPick;
