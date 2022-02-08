import React, { FunctionComponent } from "react";

import { LabData } from "../components/LabTable";

const Labs: FunctionComponent = () => (
    <div className="labs">
        <h2>Labs!</h2>
        <p>
            Labs in CS41 provide a hands-on opportunity to experiment with the 
            Python concepts presented in lectures. Although students work on 
            these labs during an 80-minute class period, it would take much 
            longer to fully complete a lab. Each lab comes with a number of 
            challenge problems that will take even the experiences programmer 
            nontrivial time. Labs are collaborative and open-ended, frequently 
            asking you to think about how or why Python makes the decisions it 
            does.
        </p>
        <p>
            Each problem is chosen to reinforce a particular concept, but you 
            are free to skip around at will. You are not expected to submit 
            your solutions to labs, although our reference solutions will be 
            posted afterwards. Think of labs as a chance to solidify your 
            working knowledge of Python - after all, what better way to learn 
            Python than to practice it?
        </p>
      {/*  <LabData />*/}
    </div>
);

export default Labs;