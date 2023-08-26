import React from "react";

class Car extends React.Component {
  //CONSTUCTEUR
  //Le constructeur est appelé avant le composant est monté.
  //Le constructeur est appelé avec les props en paramètre.
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
      owner: {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        address: {
          streetNumber: 10,
          streetName: "rue de la Paix",
          postCode: 75000,
          city: "Paris",
          country: "France",
        },
      },
      options: ["ABS", "4x4", "Clim", "GPS"],
    };
  }
  //Se déclenche après le rendu du composant
  //   componentDidMount() {
  //     setTimeout(() => {
  //       this.setState({ brand: "Mercedes" });
  //     }, 3000);
  //   }

  changeColor = () => {
    //a noter fonction de callback en second paramètre
    this.setState({ color: "blue" }, () => {
      console.log(this.state.color);
    });
  };
  //est excuter a chaque fois que le composant est mis a jour

  render() {
    // console.log(this.state);
    return (
      <>
        <h1>My {this.props.brand}</h1>
        <p>
          It is a {this.state.color} {this.state.model} from {this.props.year}.
        </p>
        <button type="button" onClick={this.changeColor}>
          Change Color
        </button>
      </>
    );
  }
}
export default Car;
