import React, { createContext } from 'react'
import { userDataCache } from '../global_data';


export const info = JSON.parse(localStorage.getItem(userDataCache));
let userData={};

if(info === null)
{
    userData={ isLogin: false, login: () => { }, logout: () => { }, username: null,uid:null};
}
else
{
    userData={ isLogin: true, login: () => { }, logout: () => { }, username: info.username,uid:info.uid};
}


export const AuthContext = createContext(userData);