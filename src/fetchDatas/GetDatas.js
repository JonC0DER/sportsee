import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';


/**
 * create the mock data with export asset
 * @return {array} Mocking data
*/
const GetMock = () => {
    const {
        USER_MAIN_DATA,
        USER_ACTIVITY,
        USER_AVERAGE_SESSIONS,
        USER_PERFORMANCE
    } = require("../assets/datas/data__mock__")
    const mocks = [
        { data: USER_MAIN_DATA[0] },
        { data: USER_ACTIVITY[0] },
        { data: USER_AVERAGE_SESSIONS[0] },
        { data: USER_PERFORMANCE[0] }
    ];
    const mock = /*JSON.stringify(*/mocks//)

    return mock
}

/**
 * variables initialisation
 * the link + end-point wich is the user id
 * @param {string} string from location path
 * 
 * @function
 * @example
 * get location : "http://localhost:3000/user/12"
 * then split it to have the path and the end-point user_id
 * then parseInt() the user_id "12" -> 12
 * so we got an array like:
 * [
 *   string,
 *   integer
 * ]
 * 
 * [
 *  "http://localhost:3000/user/",
 *  12
 * ]
 * @returns {Array} [link, userID]
 */
const InitVariables = () => {
    const location = useLocation();
    const ArrayPath = location.pathname.split('/');
    const userID = ArrayPath.filter(node =>
        (Number.isInteger(parseInt(node))) ? node : null
    )[0];

    return ["http://localhost:3000/user/", userID]
}

/**
 * fetch data with axios & return it 
 * @param {array} array of 2 elements from InitVariables()
 * 
 * @function
 * @example
 * [
 *      {
 *          "data": {
 *              "id":42,
 *              "userInfos": {
 *                  "firstName":"John",
 *                  "lastName":"CODER",
 *                  "age":37
 *              },
 *              "todayScore": 0.18,
 *              "keyData": {
 *                  "calorieCount":2930,
 *                  "proteinCount":365,
 *                  "carbohydrateCount":290,
 *                  "lipidCount":50
 *              }
 *          }
 *      },
 *      {
 *          "data": {
 *              "userId":42,
 *              "sessions": [
 *                  {
 *                      "day":"2020-07-01",
 *                      "kilogram":70,
 *                      "calories":120
 *                  },
 *                  {...},
 *              ]
 *          }
 *      },
 *      {
 *          "data": {
 *              "userId":42,
 *              "sessions": [
 *                  {
 *                      "day":1,
 *                      "sessionLength":30
 *                  },
 *                  {
 *                      "day":2,
 *                      "..."
 *                  },
 *                  {...},
 *              ]
 *          }
 *      },
 *      {
 *          "data": {
 *              "userId": 42,
 *              "kind": {
 *                  "1":"cardio",
 *                  "2":"energy",
 *                  ...
 *              },
 *              "data":[
 *                  {
 *                      "value":180,
 *                      "kind":1
 *                  },
 *                  {"value":220,"kind":2},
 *                  {...},
 *              ]
 *          }
 *      }
 * ] or return the mock if it's failed
 * @returns {array} [Datas] 
 */
const GetDatas = () => {
    const link = InitVariables()[0];
    const userID = InitVariables()[1];

    const [post, setPost] = useState([]);

    const client = axios.create({
        baseURL: `${link}${userID}/`
    });
    const folder = useMemo(() => (["", "activity", "average-sessions", "performance"]), []);
    const allApi = folder.map(el => client.get(el));

    useEffect(() => {
        const ApiArray = [];
        axios.all(allApi)
            .then(axios.spread((...responses) => {
                responses.map(res => ApiArray.push(res.data));
                setPost(ApiArray)
            }))
            .catch((error) => {
                console.log(error)
                setPost(GetMock())
            })
    }, []); // eslint-disable-line

    return JSON.stringify(post)
}

export default GetDatas;