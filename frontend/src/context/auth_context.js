import React, { createContext } from 'react'
import { userDataCache } from '../global_data';


export const info = JSON.parse(localStorage.getItem(userDataCache));
let userData={};


console.log('user_info',info);

if(info === null)
{
    userData={ isLogin: false, login: () => { }, logout: () => { }, username: null,uid:null};
}
else
{
    userData={ isLogin: true, login: () => { }, logout: () => { }, username: info.username,uid:info.id};
}


export const AuthContext = createContext(userData);