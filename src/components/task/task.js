import React, { useState, useEffect, useRef } from "react";
import Title from "../../shared/title";

import "./task.css";

const Task = () => {
  let init = true;

  let [x, change] = useState(0);

  let [str, strchange] = useState("BOB");

  let render = useRef(1);

  useEffect(() => {
    render.current = render.current + 1;
  });

  function handle() {
    change((prev) => {
      return prev + 1;
    });
    console.log(x);
  }

  function handlestr() {}

  useEffect(() => {
    console.log(" effect ");
    str = "Bob" + x.toString();
    strchange(str);
  }, [x]);

  return (
    <React.Fragment>

        <Title title="TASK"/>
      <section className="ro">
        
        <div className="co">
          <article>row1 col 1</article>
          <article>row1 col2</article>
        </div>

        <div className="co">
          <article>row 2 col 1</article>
          <article>row 2 col 2</article>
        </div>

        <article> row 3 </article>

        <article> row 4 </article>

        <article> row 5 </article>
      </section>
      {/* <div className="task">
            <h1 className="white">
                The value is {x}
            </h1>

            <button onClick={handle}>
                Increment 
            </button>
        </div>

<div className="task">
<h1 className="white">
    The value is {str}
</h1>

<button onClick={handlestr}>
    Increment 
</button>
</div>

<div className="task">
           <h1 className="white" >
            Render count {render.current}
           </h1>
        </div> */}
    </React.Fragment>
  );
};

export default Task;
