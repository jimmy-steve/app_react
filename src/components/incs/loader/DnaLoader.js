import React from "react";
import {Dna} from "react-loader-spinner";

class DnaLoader extends React.Component {
    render() {
        return (
            <div className="me-1">
                <Dna
                    visible={true}
                    height="50"
                    width="50"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        );
    }
}

export default DnaLoader;
