import styles from './Card.module.css'

function Card({ imgUrl, imgName, clickHandler }) {
  return (
    <div data-id={imgName} onClick={clickHandler} className={styles.card}>
      <img data-id={imgName} src={imgUrl} alt="" />
      <p data-id={imgName}>{imgName}</p>
    </div>
  );
}

export default Card;
