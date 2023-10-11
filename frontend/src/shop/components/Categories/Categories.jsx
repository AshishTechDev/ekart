import styles from "./Categories.module.css";

import CategoryBox from "./CategoryBox";

const CATEGORY_LIST = [
  {
    src: "./laptop.png",
    label: "Laptops",
    catLinks: ["For Home", "For Business"],
  },
  {
    src: "./desktop.png",
    label: "Desktop",
    catLinks: ["For Home", "For Business"],
  },
];
export default function Categories() {
  return (
    <div className={styles["category-container"]}>
      {CATEGORY_LIST.map((category) => {
        return <CategoryBox category={category} />;
      })}
      {/* <div className="category-box">
        <div className="cat-item">
          <div>
            <img
              width="33"
              height="33"
              src="images/desktop.png"
              alt="Desktops"
            />
          </div>
          <div className="cat-label">Desktops</div>
          <div className="cat-links">
            <a href="">For Home</a>
            <a href="">For Business</a>
          </div>
        </div>
      </div>
      <div className="category-box">
        <div className="cat-item">
          <div>
            <img
              width="33"
              height="33"
              src="images/alien.png"
              alt="Alienware"
            />
          </div>
          <div className="cat-label">Alienware</div>
          <div className="cat-links">
            <a href="">For Home</a>
            <a href="">For Business</a>
          </div>
        </div>
      </div>
      <div className="category-box">
        <div className="cat-item">
          <div>
            <img width="33" height="33" src="images/vastro.png" alt="Vostro" />
          </div>
          <div className="cat-label">Vostro</div>
          <div className="cat-links">
            <a href="">For Home</a>
            <a href="">For Business</a>
          </div>
        </div>
      </div>
      <div className="category-box">
        <div className="cat-item">
          <div>
            <img
              width="33"
              height="33"
              src="images/monitor.png"
              alt="Monitor"
            />
          </div>
          <div className="cat-label">Monitor</div>
          <div className="cat-links">
            <a href="">For Home</a>
            <a href="">For Business</a>
          </div>
        </div>
      </div>
      <div className="category-box">
        <div className="cat-item">
          <div>
            <img
              width="33"
              height="33"
              src="images/headphone.png"
              alt="headphone"
            />
          </div>
          <div className="cat-label">Accessories</div>
          <div className="cat-links">
            <a href="">For Home</a>
            <a href="">For Business</a>
          </div>
        </div>
      </div> */}
    </div>
  );
}
