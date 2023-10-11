import Categories from "../components/Categories/Categories";
import MainFooter from "../components/Footer/MainFooter";
import MainHeader from "../components/Header/MainHeader";
import CustomerReport from "../components/customer_report/CustomerReport";
import LatestProduct from "../components/LatestProduct/LatestProduct";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <MainHeader />
      <Categories />
      <section>
        <div className={styles["hero-img"]}>
          <img src="./banner.jpg" alt="" />
        </div>
      </section>
      <LatestProduct />
      <CustomerReport />
      <MainFooter />
    </div>
  );
}
