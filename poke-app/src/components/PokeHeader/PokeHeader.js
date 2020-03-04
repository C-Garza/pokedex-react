import React from "react";

const PokeHeader = ({name, id}) => {
  return(
    <div>
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
      />
      <h2>{name}</h2>
    </div>
  );
};

export default PokeHeader;