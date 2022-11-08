import React from "react";
import "./policies.css";

function PoliciesRender({ product }) {
  let rules = product.policy.rules;
  let arrayRules = rules.split(",");
  let health_safety = product.policy.health_safety;
  let arrayHealth = health_safety.split(",");
  let cancellation_policy = product.policy.cancellation_policy;
  let arrayCancellation = cancellation_policy.split(",");

  return (
    <div className="policies">
      <h2>Qué tenés que saber</h2>
      <hr></hr>
      <div className="policies-container">
        <div className="rules-container">
          <h3>Normas de la casa</h3>
          <ul type="none">
            {arrayRules.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className="healthSafety-container">
          <h3>Salud y seguridad</h3>
          <ul type="none">
            {arrayHealth.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className="cancellation-container">
          <h3>Política de cancelación</h3>
          <ul type="none">
            {arrayCancellation.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PoliciesRender;
