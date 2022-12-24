import React from "react";

const User = props => {


  const items = props.data.map((item) => {

        return <li key={item}>
            {item}
        </li>
    });

    return (<div>

        <ul>


          {items}

        </ul>


    </div>);
};

export default User;