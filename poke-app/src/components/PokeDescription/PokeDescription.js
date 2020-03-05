import React from "react";

const PokeDescription = ({physicalChars}) => {
  const getTypes = () => {
    return physicalChars.types.map((type) => {
      return type.type.name;
    }).map((type) => {
      return <p>{type}</p>
    });
  };
  return(
    <div>
      <p>HT: {physicalChars.height}m</p>
      <p>WT: {physicalChars.weight}kg</p>
      {getTypes()}
    </div>
  );
};

export default PokeDescription;