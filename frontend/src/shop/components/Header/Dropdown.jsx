import styles from "./Dropdown.module.css";

export default function Dropdown(props) {
  return (
    <>
      <div className={styles["contaier-apex-dropdown"]}>
        <ul className={`${styles["apex-list"]} ${styles["item-non-bullet"]}`}>
          {props.dropdownLinks.map((dropdownlink) => {
            return (
              <li className={styles["apex-list-item apex-drop-first-parent"]}>
                <a href="" className={styles["nav-link"]}>
                  {dropdownlink.mainLink}
                </a>
              </li>
            );
          })}

          {/* <li className="apex-list-item apex-drop-second-parent">
            <a href="" className="nav-link">
              Compute & HCL
              <div className="nav-link-icon">
                <img
                  width="19"
                  height="19"
                  src="https://img.icons8.com/ios-glyphs/30/000000/forward.png"
                  alt="forward"
                />
              </div>
            </a>

            <div className="container-apex-dropdown-child apex-dropdown-first-child">
              <ul className="item-non-bullet">
                <li>
                  <a href="" className="nav-link">
                    Apex Private Cloud
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Compute
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="apex-list-item apex-drop-third-parent">
            <a href="" className="nav-link">
              Storage
              <div className="nav-link-icon">
                <img
                  width="19"
                  height="19"
                  src="https://img.icons8.com/ios-glyphs/30/000000/forward.png"
                  alt="forward"
                />
              </div>
            </a>
            <div className="container-apex-dropdown-child apex-dropdown-second-child">
              <ul className="item-non-bullet">
                <li>
                  <a href="" className="nav-link">
                    Apex Storage for Private Cloud
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Storage for Public Cloud
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="apex-list-item apex-drop-forth-parent">
            <a href="" className="nav-link">
              Cyber & Data Protection
              <div className="nav-link-icon">
                <img
                  width="19"
                  height="19"
                  src="https://img.icons8.com/ios-glyphs/30/000000/forward.png"
                  alt="forward"
                />
              </div>
            </a>

            <div className="container-apex-dropdown-child apex-dropdown-forth-child">
              <ul className="item-non-bullet">
                <li>
                  <a href="" className="nav-link">
                    Apex Backup Services
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Cyber Recovery Services
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Data Storage Services Backup Target
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="apex-list-item apex-drop-five-parent">
            <a href="" className="nav-link">
              Cloud Platforms
              <div className="nav-link-icon">
                <img
                  width="19"
                  height="19"
                  src="https://img.icons8.com/ios-glyphs/30/000000/forward.png"
                  alt="forward"
                />
              </div>
            </a>

            <div className="container-apex-dropdown-child apex-dropdown-five-child">
              <ul className="item-non-bullet">
                <li>
                  <a href="" className="nav-link">
                    Apex Cloud Platform for Microsoft Azure
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Cloud Platform for Red Hat OpenShift
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Cloud Platform for VMWare
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Hybrid Cloud for VMWare
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="apex-list-item">
            <a href="" className="nav-link">
              APEX High Performance Computing
            </a>
          </li>
          <li className="apex-list-item apex-drop-six-parent">
            <a href="" className="nav-link">
              Create a Custom Solution
              <div className="nav-link-icon">
                <img
                  width="19"
                  height="19"
                  src="https://img.icons8.com/ios-glyphs/30/000000/forward.png"
                  alt="forward"
                />
              </div>
            </a>

            <div className="container-apex-dropdown-child apex-dropdown-six-child">
              <ul className="item-non-bullet">
                <li>
                  <a href="" className="nav-link">
                    Apex Flex on Demand
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Data Centre Utility
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="apex-list-item apex-drop-seven-parent">
            <a href="" className="nav-link">
              Resources
              <div className="nav-link-icon">
                <img
                  width="19"
                  height="19"
                  src="https://img.icons8.com/ios-glyphs/30/000000/forward.png"
                  alt="forward"
                />
              </div>
            </a>
            <div className="container-apex-dropdown-child apex-dropdown-seven-child">
              <ul className="item-non-bullet">
                <li>
                  <a href="" className="nav-link">
                    Apex Use Cases
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Business Value
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Sustainability
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Professional Services
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Console
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Colocation Services
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Apex Partners
                  </a>
                </li>
              </ul>
            </div>
          </li> */}
        </ul>
      </div>
    </>
  );
}
