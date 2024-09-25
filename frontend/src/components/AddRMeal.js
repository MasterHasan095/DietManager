import React from "react";
import { isAuthenticated } from "../Services/authService";

const AddRMeal = () =>{
    return (
        isAuthenticated ? (
            <div>
                This works
            </div>
        ) : <div>
            Unauthorized
        </div>
    )
}

export default AddRMeal;