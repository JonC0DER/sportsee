import { NavLink } from "react-router-dom"

const Home = () => {
    return (
        <div className="user-selection">
            <button className="user-btn">
                <NavLink to="/user/12">
                    <i className="fa fa-user-circle"></i>
                    &nbsp;Utilisateur 1
                </NavLink>
            </button>
            <button className="user-btn">
                <NavLink to="/user/18">
                    <i className="fa fa-user-circle"></i>
                    &nbsp;Utilisateur 2
                </NavLink>
            </button>
        </div>
    )
}

export default Home