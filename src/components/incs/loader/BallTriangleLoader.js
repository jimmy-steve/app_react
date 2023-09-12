import React from "react";
import {BallTriangle} from "react-loader-spinner";

class BallTriangleLoader extends React.Component {
    render() {
        return (
            <div className="me-1">
                <BallTriangle
                    height={300}
                    width={300}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                />
            </div>
        );
    }
}

export default BallTriangleLoader;
