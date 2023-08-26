import React from "react";
import axios from "axios";
import { useNavigate as Router } from "react-router-dom";

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      redirect: false,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("token")) {
      axios
        .get("http://127.0.0.1:8000/api/photos")
        .then((response) => {
          this.setState({ photos: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ redirect: true });
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Router to="/login" />;
    }
    return (
      <>
        <h1>Composant pour les photos</h1>
        <div className="row">
          {this.state.photos.map((photo) => (
            <div className="col-md-4" key={photo.id}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <p className="card-text">Title : {photo.title}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <p>Description : {photo.description}</p>
                    </div>
                    <small className="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
export default Photos;
