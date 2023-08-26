import React from "react";
import SideBar from "./incs/SideBar";
import Footer from "./incs/Footer";
import NavBarBootstrap from "./incs/NavBarBootstrap";

const Home = () => {
  return (
    <>
      <div className="container-fluid position-relative p-0">
        <SideBar />
        <div class="content">
          <NavBarBootstrap />
          <div class="container-fluid px-4">
            <div class="row g-4">
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
        <button class="btn btn-lg btn-lg-square back-to-top">
          <i class="bi bi-arrow-up"></i>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Home;
