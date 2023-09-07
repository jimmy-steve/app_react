import React from "react";
import { ThreeCircles } from "react-loader-spinner";

class AppLoader extends React.Component {
  render() {
    return (
      <div className="mt-5">
        <ThreeCircles
          height="200"
          width="200"
          color="#ffc107"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    );
  }
}

export default AppLoader;
