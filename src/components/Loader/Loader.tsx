import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <>
      <div className={styles.backdrop}>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
