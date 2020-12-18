/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React from 'react';
import './App.css';
import {Admin, Resource} from "react-admin";
import {dataProvider} from "./sagas/root.saga";
import authProvider from "./providers/auth.providers";
import {UserCreate, UserEdit, UserList} from "./containers/Users";
import UserIcon from '@material-ui/icons/Group';
import errorSagas from "./sagas/error.saga";

const App = () => <Admin dataProvider={dataProvider} authProvider={authProvider} customSagas={[errorSagas]}>
    {permissions => [
        permissions === "superuser" || permissions === "staff" ?
            <Resource name="users"
                      list={UserList}
                      edit={permissions === "superuser" ? UserEdit : null}
                      create={permissions === "superuser" ? UserCreate : null}
                      icon={UserIcon}/>
            : null
    ]}
</Admin>;

export default App;
