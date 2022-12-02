import React, { Suspense } from 'react';
import Activity from '../component/Activity';
import AverageSessions from '../component/AverageSessions';
import Performance from '../component/Performance';
import Score from '../component/Score';
import AsideInfos from '../component/AsideInfos';
import GetDatas from '../fetchDatas/GetDatas';
//const LazyGetDatas = React.lazy(()=> import('../fetchDatas/GetDatas'))
//import ReactLoading from "react-loading";


export default function Home(){

    const Loading = () => {
        return(
            <div>
                <h1>LOADING...</h1>
                {/*<ReactLoading 
                type="bars" 
                color="#0000FF"
                    height={100} width={50} />*/}
            </div>
        )
    }

    const formatData = () => {
        const ex = GetDatas()
        //console.log(ex)
        if (ex === '[]') {
            console.log('not load')
        }else{
            //console.log(ex)
            const dApi = JSON.parse(ex);
            //console.log(dApi)
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
            return [user, activity, average, performance]
        }
    }

    const HomeRender = ({dataFormat}) => {
        return(
            <>
            { (!dataFormat) ?  <Loading/> : 
            <div className="user-section">
                <h1 className="hello">Bonjour &nbsp;
                    <span className="red-name">
                        {dataFormat[0].firstName}
                    </span>
                </h1>
                <p className='msg-progress'>Félicitation</p>
                <section className="activity">
                    <div className="desc-activity">
                        <Activity data={dataFormat[1]}/>
                        <div className="others-info">
                            <AverageSessions data={dataFormat[2]}/>
                            <Performance data={dataFormat[3]}/>
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

    return (
        <>
            <Suspense fallback={ <Loading/> } >
               <HomeRender dataFormat={formatData()} />
            </Suspense>
        </>
    )
}
