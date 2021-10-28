import react from "react";
import styles from "../stylesheets/adminPanel.css";

function NewUser(props){

    const {name,email} = props;

    return (
        <div className="row">
            <div className="col-8 name-email-div">
                <h6>{name}</h6>
                <p>{email}</p>
            </div>
            <div className="col-2">
                <button className="more-user-info">More</button>
            </div>
            <hr className="new-user-hr" />
        </div>
    );
}

export default NewUser;