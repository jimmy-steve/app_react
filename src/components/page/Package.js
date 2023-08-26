import React from "react";
import SideBar from "../incs/SideBar";
import NavBarBootstrap from "../incs/NavBarBootstrap";

const Package = () => {
  return (
    <>
      <div className="container-fluid position-relative p-0">
        <SideBar />
        <div class="content">
          <NavBarBootstrap />
          <div class="container-fluid px-4">
            <div class="row g-4">
              <div className="col-md-12 mt-5">
                <code>
                  <pre>
                    <span className="text-primary">{"{"}</span>
                    <br />
                    <span className="text-primary">"name"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"mealplanner"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"version"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"0.1.0"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"private"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">true</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"dependencies"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-primary">{"{"}</span>
                    <br />
                    <span className="text-primary">"axios"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^0.21.1"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"bootstrap"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^5.0.0-beta1"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"react"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^17.0.1"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"react-bootstrap"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^1.4.3"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"react-dom"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^17.0.1"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"react-router-dom"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^5.2.0"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"react-scripts"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"4.0.1"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"web-vitals"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^0.2.4"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary">"react-router-dom"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^5.2.0"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary"> "scripts"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-primary">{"{"}</span>
                    <br />
                    <span className="text-warning"> "start"</span>
                    <span className="text-muted"> : </span>{" "}
                    <span className="text-warning">"react-scripts start"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-warning"> "build"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"react-scripts build"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-warning"> "test"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"react-scripts test"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-warning"> "eject"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"react-scripts eject"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-warning"> "build:css"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">
                      "postcss src/css/main.css -o dist/css/main.css"
                    </span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary"> {"}"}</span>
                    <br />
                    <span className="text-primary"> "eslintConfig"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-primary">{"{"}</span>
                    <br />
                    <span className="text-warning"> "extends"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-primary">{"["}</span>
                    <span className="text-warning"> "react-app",</span>
                    <span className="text-warning"> "react-app/jest"</span>
                    <span className="text-primary">{"]"}</span>
                    <span className="text-primary">{"}"}</span>
                    <br />
                    <span className="text-primary"> "browserslist"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-primary">{"{"}</span>
                    <br />
                    <span className="text-warning"> "production"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-primary">{"["}</span>
                    <span className="text-warning"> "&gt;0.2%",</span>
                    <span className="text-warning"> "not dead",</span>
                    <span className="text-warning"> "not op_mini all"</span>
                    <span className="text-primary">{"],"}</span>
                    <br />
                    <span className="text-warning"> "development"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-primary">{"["}</span>
                    <span className="text-warning">
                      {" "}
                      "last 1 chrome version",
                    </span>
                    <span className="text-warning">
                      {" "}
                      "last 1 firefox version",
                    </span>
                    <span className="text-warning">
                      {" "}
                      "last 1 safari version"
                    </span>
                    <span className="text-primary">{"],"}</span>
                    <br />
                    <span className="text-primary"> {"}"}</span>
                    <br />
                    <span className="text-primary"> "devDependencies"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-primary">{"{"}</span>
                    <br />
                    <span className="text-warning"> "postcss"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^8.4.27"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-warning"> "postcss-cli"</span>
                    <span className="text-muted">:</span>{" "}
                    <span className="text-warning">"^10.1.0"</span>
                    <span className="text-primary">,</span>
                    <br />
                    <span className="text-primary"> {"}"}</span>
                    <br />
                    <span className="text-primary">{"}"}</span>
                    <br />
                  </pre>
                </code>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-lg btn-lg-square back-to-top">
          <i class="bi bi-arrow-up"></i>
        </button>
      </div>
    </>
  );
};

export default Package;
