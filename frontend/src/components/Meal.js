import React from "react"
import { isAuthenticated } from "../Services/authService"

const Meal = () => {

    return (isAuthenticated && (
        <>
        Add A Meal here
        </>
    ))
}

export default Meal;