import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';


/**
 * create the mock data
 * @return Mocking data
*/
const GetMock = () => {
    const {
        USER_MAIN_DATA,
        USER_ACTIVITY,
        USER_AVERAGE_SESSIONS,
        USER_PERFORMANCE
    } = require("../assets/datas/data__mock__")
    const mocks = [
        {data: USER_MAIN_DATA[0]},
        {data: USER_ACTIVITY[0]},
        {data: USER_AVERAGE_SESSIONS[0]},
        {data: USER_PERFORMANCE[0]}
    ];
    const mock = JSON.stringify(mocks)

    return mock
}

/**
 * variables initialisation
 * @returns Array
 */
const InitVariables = () => {
    const location = useLocation();
    const ArrayPath = location.pathname.split('/');
    const userID = ArrayPath.filter(node => 
        (Number.isInteger( parseInt(node) )) ? node : null
    )[0];
    
    return ["http://localhost:3000/user/", userID]
}

/**
 * fetch data with axios 
 * @returns array Datas
 */
const GetDatas = () => {    
    const link = InitVariables()[0];
    const userID = InitVariables()[1];

    const [error, setError] = useState(null);
    const [post, setPost] = useState([]);
    
    const client = axios.create({
        baseURL: `${link}${userID}/`
    });
    const folder = useMemo(() =>(["", "activity", "average-sessions", "performance"]),[]);
    const allApi = folder.map(el => client.get(el));

    useEffect(() => {
        const getUserDatas = async() =>{
            try {
                const ApiArray = [];
                await axios.all(allApi)
                .then(axios.spread((...responses) => {
                    responses.map(res => ApiArray.push(res.data));
                    return responses;
                }))

                setPost(ApiArray)
            } catch (error) {
                setError(error)
            }
        }
        getUserDatas();
    },[]); // eslint-disable-line

    //console.log(post)
    if (error) {
        if(error.message === "Network Error"){
            console.log(error)
            return GetMock()
        }
    }
    if(!post) return GetMock()
    return JSON.stringify(post)
}

export default GetDatas;