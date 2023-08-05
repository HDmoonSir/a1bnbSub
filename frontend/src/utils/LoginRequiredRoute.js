// 리액트 react-router-dom 수정

import React from "react";

import { Route} from "react-router-dom";
import { useAppContext } from "../store";

export default function LoginRequiredRoute({
    component: Component,
    ...kwargs
}) {
    const {
        store: { isAuthenticated }
    } = useAppContext();

    if (isAuthenticated) {
    } else {
    }

    const navigate = navigate();


    return (
        <Route
            {...kwargs}
            render={props => {
                if (isAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return (
                        // <Redirect
                        //     to={{
                        //         pathname: "/accounts/login",
                        //         state: { from: props.location }
                        //     }}
                        // />
                        navigate("/accounts/login", 
                        { state: { from: props.location } })
                    );
                }
            }}
        />
    );
}