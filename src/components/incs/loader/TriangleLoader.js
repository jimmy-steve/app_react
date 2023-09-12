import React from "react";
import {Triangle} from "react-loader-spinner";

class TriangleLoader extends React.Component {
    render() {
        return (
            <div className="me-1">
                <Triangle
                    height="300"
                    width="300"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
        );
    }
}

export default TriangleLoader;
