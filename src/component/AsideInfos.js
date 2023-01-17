import PropTypes from 'prop-types'
import React from 'react'
/**
 * get props to set the aside information
 * @param {object} data
 * 
 * @component 
 * @example
 *  data = {
 *      calorieCount : 2930
 *      carbohydrateCount : 290
 *      lipidCount : 50
 *      proteinCount : 365
 * } 
 * @returns {component}
 */
function AsideInfos({ data }) {
    //console.log(data)
    /**
    * this array contain informations to interact with the props
    * and set icons colors and text into the component
    */
    const asideData = [
        ["red", "fire", "Calories", "kCal", "calorieCount"],
        ["blue", "drumstick-bite", "Proteines", "g", "proteinCount"],
        ["yellow", "apple-alt", "Glucides", "g", "carbohydrateCount"],
        ["pink", "hamburger", "Lipides", "g", "lipidCount"]
    ]

    /**
     * mapping asideData array to set all 
     * the entries in the component
     */
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

AsideInfos.propTypes = {
    data: PropTypes.objectOf(PropTypes.number)
}

export default AsideInfos