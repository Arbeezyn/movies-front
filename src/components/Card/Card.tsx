import { Link } from "@tanstack/react-router";
import CardProps from "../../interface/ICard";
import styles from "./Card.module.css";

const Card: React.FC<CardProps> = ({ posterUrl, filmId }) => {
  return (
    <Link to="/movie/$movieId" params={{ movieId: filmId }}>
      <div className={styles.card}>
        <img
          className={styles.img}
          src={"http://localhost:3000/" + posterUrl?.replace(/^uploads\//, "")}
          alt=""
        />
      </div>
    </Link>
  );
};
export default Card;
