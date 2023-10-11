import { Link } from "react-router-dom";
import styles from "./MainFooter.module.css";

export default function FooterOffering(props) {
  return (
    <div className={`${styles["ft-box-first"]} ${styles["ft-box"]}`}>
      <ul>
        {props.items.page_links.map((item) => {
          return (
            <li>
              <Link to="" className="link">
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
