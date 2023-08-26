import React from "react";
import Navbar from "./NavBarBootstrap";
import Axios from "axios";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      search: "",
    };
  }

  componentDidMount() {
    Axios.get("https://de-lafontaine.ca/mealplanner/public/api/pictures")
      .then((response) => {
        console.log(response.data);
        this.setState({ pictures: response.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value }, () => {
      console.log(this.state.search);
    });
    if (this.state.search === "") {
      this.getArticles();
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getArticles();
  };

  getArticles() {
    let bodyFormData = new FormData();
    bodyFormData.set("search", this.state.search);

    Axios.post(
      "https://de-lafontaine.ca/mealplanner/public/api/pictures",
      bodyFormData
    )
      .then((response) => {
        console.log(response.data);
        this.setState({ pictures: response.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="container my-3">
          <div className="d-flex justify-content-center mb-4">
            <form
              action="POST"
              className="form-inline my-2 my-lg-0"
              onSubmit={this.handleSubmit}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                name="search"
                placeholder="Search a picture here ..."
                onChange={this.handleSearchChange}
              />
            </form>
          </div>

          <div className="row justify-content-center mt-3">
            {this.state.pictures.map((picture) => (
              <div
                className="card mx-2 mb-2"
                key={picture.id}
                style={{ width: "350px" }}
              >
                {/* <h3 className="card-header">Card header</h3> */}
                <img
                  src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${picture.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{picture.title}</h5>
                </div>

                <div className="card-body">
                  <p className="card-text">{picture.description}</p>
                  <Link
                    to={`/pictures/${picture.id}`}
                    className="btn btn-primary"
                  >
                    En savoir plus
                  </Link>
                </div>
                {/* <div className="text-muted">2 days ago</div> */}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default Home;
