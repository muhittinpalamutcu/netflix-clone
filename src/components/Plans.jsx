import React, { useState, useEffect } from "react";
import db from "../firebase";
import "./Plans.css";

const Plans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    db.collection("plans")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        let planList = {};
        querySnapshot.forEach(async (planDoc) => {
          planList[planDoc.id] = planDoc.data();
        });
        const sortedPlan = Object.entries(planList)
          .sort((a, b) => a[1].price - b[1].price)
          .reverse();

        setPlans(sortedPlan);
      });
  }, []);

  return (
    <div className="plans">
      {plans.map((item) => {
        return (
          <div key={item[0]} className="planScreen__plan">
            <div className="planScreen_info">
              <h5>{item[1].name}</h5>
              <h6>{item[1].description}</h6>
            </div>
            <button>Subscription ${item[1].price} </button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;
