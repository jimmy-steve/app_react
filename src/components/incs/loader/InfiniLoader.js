import React from "react";
import { InfinitySpin } from "react-loader-spinner";

class InfiniLoader extends React.Component {
    render() {
        return (
            <div className="">
                <InfinitySpin
                    width='200'
                    color="#4fa94d"
                />
            </div>
        );
    }
}

export default InfiniLoader;
