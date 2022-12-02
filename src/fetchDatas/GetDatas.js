import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';


const GetDatas = () => {
    const {
        USER_MAIN_DATA,
        USER_ACTIVITY,
        USER_AVERAGE_SESSIONS,
        USER_PERFORMANCE
    } = require("../assets/datas/data__mock__")
    const mocks = [USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE];
    const mock = mocks//JSON.stringify(mocks)
    //console.log(mock)
    
    const [error, setError] = useState(null);
    const [post, setPost] = useState([]);
    
    const location = useLocation();
    const ArrayPath = location.pathname.split('/');
    const userID = ArrayPath.filter(node => 
        (Number.isInteger( parseInt(node) )) ? node : null
    )[0];
    const client = axios.create({
        baseURL: `http://localhost:3000/user/${userID}/`
    });
    const folder = useMemo(()=> (["", "activity", "average-sessions", "performance"]),[]);
    //const allApi = folder.map(el => client.get(el))
    const allApi = useMemo(() => (folder.map(el => client.get(el))),[folder, client])
    /*
    const SetRes = (res) => {
        useEffect(()=>{
            setPost([res]);
        },[res])
    }*/
    const getUserDatas = async() =>{
        const ApiArray = [];
        //const res = await axios.all(allApi)
        await axios.all(allApi)
            .then(axios.spread((...responses) => {
                responses.map(res => ApiArray.push(res.data));
                const nApi = [...new Set(ApiArray)];
                //const napi = JSON.stringify(nApi);
                const napi = nApi;
                setPost(napi);
            }))
            .catch(error => {
                setError(error);
            });
        //console.log(res)
    }
    
    useEffect(() => {
        getUserDatas();
    },[folder]); // eslint-disable-line

    if(error) return `Error : ${error.message}`;
    //console.log(post)
    if(!post) return JSON.stringify(mock)
    return JSON.stringify(post)
}


export default GetDatas;