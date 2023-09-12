import React from "react";
import {Link} from "react-router-dom";

const CustomBreadcrumb = ({pageTitle}) => {
    return (
        <>
            <ol className="breadcrumb">

                <li className="breadcrumb-item">
                    <Link
                        className=""
                        to="/"
                    >
                        home
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link
                        className=""
                        to="/blog"
                    >
                        blog
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    category / {pageTitle}
                </li>
            </ol>
        </>

    );
}

export default CustomBreadcrumb;