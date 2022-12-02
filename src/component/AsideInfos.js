import React from 'react'

function AsideInfos({data}) {
   // console.log(data)
    const asideData = [
        ["red", "fire", "Calories", "kCal", "calorieCount"],
        ["blue", "drumstick-bite", "Proteines", "g", "proteinCount"],
        ["yellow", "apple-alt", "Glucides", "g", "carbohydrateCount"],
        ["pink", "hamburger", "Lipides", "g", "lipidCount"]
    ]
    return (
        <aside>
        {asideData.map((entry, key) =>
            <div className="info" key={key}>
                <span className={`icone ${entry[0]}`}>
                    <i className={`fas fa-${entry[1]}`}></i>
                </span>
                <span className="units-info">
                    <h3 className="units">{data[entry[4]]}{entry[3]}</h3>
                    <p>{entry[2]}</p>
                </span>
            </div>
        )}
        </aside>
    )
}

export default AsideInfos