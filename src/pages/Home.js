import React, { Suspense } from 'react';
import Activity from '../component/Activity';
import AverageSessions from '../component/AverageSessions';
import Performance from '../component/Performance';
import Score from '../component/Score';
import AsideInfos from '../component/AsideInfos';
import GetDatas from '../fetchDatas/GetDatas';
//const LazyGetDatas = React.lazy(()=> import('../fetchDatas/GetDatas'))
import ReactLoading from "react-loading";
import PropTypes from 'prop-types';
import Greetings from '../component/Greetings';

/**
 * @returns Home component
 */
export default function Home(){
    /**
     * loader help the user to understand 
     * that we are fetching the datas
     * @returns loader component
     */
    const Loading = () => {
        return(
            <div className='loading'>
                <h1>LOADING...</h1>
                <div className='loader'>
                    {<ReactLoading 
                    type="bars" 
                    color="red"
                    height={800} width={200} />}
                </div>
            </div>
        )
    }

    /**
     * make sure that the datas are ready to use
     * format them and return an array
     * @returns array
     */
    /*const returnInitDatas = async() =>{
        const datas = await InitDatas();
        return datas
    }*/

    const formatData = () => {
        const ex = GetDatas();
        //console.log(ex)
        if (ex === '[]') {
            console.log('not load')
        }else{
            //console.log(ex)
            const dApi = JSON.parse(ex);
            //console.log(dApi[0].data.userInfos)
            const user = {
                id:dApi[0].data.id,
                keydata:dApi[0].data.keyData,
                score:(!dApi[0].data.score)? dApi[0].data.todayScore: dApi[0].data.score,
                age:dApi[0].data.userInfos.age,
                firstName:dApi[0].data.userInfos.firstName,
                lastName:dApi[0].data.userInfos.lastName
            }
            const activity = {
                userId:dApi[1].data.userId,
                sessions:dApi[1].data.sessions
            }
            const average = {
                userId:dApi[2].data.userId,
                sessions:dApi[2].data.sessions
            }
            const performance = {
                userId:dApi[3].data.userId,
                kindValues:dApi[3].data.data,
                kind:dApi[3].data.kind
            }
            //console.log( [user, activity, average, performance] )
            return [user, activity, average, performance]
        }
    }

    /**
     * set all the format data to all the components
     * that compose the user home page
     * @param {*} param0 
     * @returns HomeRender component
     */
    const HomeRender = ({dataFormat}) => {
   
        return(
            <>
            { (!dataFormat) ?  <Loading/> : 
            <div className="user-section">
                <Greetings firstName={dataFormat[0].firstName} lastName={dataFormat[0].lastName} />
                <section className="activity">
                    <div className="desc-activity">
                        <Activity data={dataFormat[1]}/>
                        <div className="others-info">
                            <AverageSessions data={dataFormat[2]}/>
                            <Performance kindValues={dataFormat[3].kindValues} kind={dataFormat[3].kind} />
                            <Score data={dataFormat[0].score}/>
                        </div>
                    </div>
                    <AsideInfos data={dataFormat[0].keydata}/>
                </section>
            </div> 
            }
            </>
        )
    }
    
    HomeRender.propTypes = {
        dataFormat : PropTypes.array
    };

    /**
     * Suspense element help waiting till the datas are fetched by the
     * axios component and ready to use
     */
    return (
        <>
            <Suspense fallback={ <Loading/> } >
               <HomeRender dataFormat={formatData()} />
            </Suspense>
        </>
    )
}
