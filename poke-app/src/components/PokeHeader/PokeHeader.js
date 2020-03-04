import React from "react";

const PokeHeader = ({name, id}) => {
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return(
    <div>
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={nameCapitalized}
      />
      <h2>{nameCapitalized}</h2>
    </div>
  );
};

export default PokeHeader;