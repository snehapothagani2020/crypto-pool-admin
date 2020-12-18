/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import jwtDecode from "jwt-decode";

function getRole() {
    let role = "miner";
    const token = sessionStorage.getItem("token");

    if (token) {
        const user = jwtDecode(token);

        if (user.is_active) {
            if (user.is_superuser) {
                role = "superuser";
            } else if (user.is_staff) {
                role = "staff";
            }
        }
    }

    return role;
}

export default getRole;