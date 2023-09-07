import SideBar from "./incs/SideBar";
import NavBarBootstrap from "./incs/NavBarBootstrap";
import {Link} from "react-router-dom";
import React from "react";



const Home = () => {
  return (
    <>
      <NavBarBootstrap pageTitle="De-Lafontaine"/>
      <div className="container-fluid m-1">
        <div className="row">
          <div className="col-2 p-0 sidebar">
            <SideBar />
          </div>
          <div className="col">
            <div className="content">
              <div className="container-fluid px-4">
                <div className="row g-4">
                  <div className="col-md-12 mt-5">
                    <h1 className="display-4">Hello</h1>
                    <p className="lead text-muted">
                      Well, well, well, look who rode into my digital saloon.
                    </p>
                    <p className="lead">
                      Name's <strong>Rusty</strong>, and I ain't just rust, I'm also
                      a React wrangler. <br />
                      Yup, this here's my slice of the web frontier.
                    </p>
                    <hr />
                    <p className="lead">
                      Now, let me spin you a yarn 'bout this little patch of
                      cyberspace. It's like mixin' up a React stew, you see? Toss in
                      some JSX veggies, a pinch of state spice, and let it all
                      simmer into a frontend hoedown.
                    </p>
                    <p className="lead">
                      Here's to a rootin' tootin' website shindig!
                    </p>
                    <p className="lead text-end">
                      <button className="btn btn-primary btn-lg">
                        Wrangle the Wisdom
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </p>
                  </div>
                </div>
              </div>






            </div>





          </div>
          </div>
        </div>
    </>
  );
};

export default Home;
