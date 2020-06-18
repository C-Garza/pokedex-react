import typesClass from "../shared-css/types.module.css"

////GETS ARRAY OF TYPES AND RETURNS ARRAY OF CLASS NAMES FOR typesClass
export const getTypesClass = (types) => {
  return types.map(type => {
    if(type === "fire") {
      return {
        card: `${typesClass.pokeTypeLogoFireCard}`, 
        logo: `${typesClass.pokeTypeLogoFire}`, 
        border: `${typesClass.pokeTypeLogoFireCardBorder}`
      }
    }
    else if(type === "water") {
      return {
        card: `${typesClass.pokeTypeLogoWaterCard}`, 
        logo: `${typesClass.pokeTypeLogoWater}`,
        border: `${typesClass.pokeTypeLogoWaterCardBorder}`
      };
    }
    else if(type === "grass") {
      return {
        card: `${typesClass.pokeTypeLogoGrassCard}`, 
        logo: `${typesClass.pokeTypeLogoGrass}`,
        border: `${typesClass.pokeTypeLogoGrassCardBorder}`
      };
    }
    else if(type === "poison") {
      return {
        card: `${typesClass.pokeTypeLogoPoisonCard}`, 
        logo: `${typesClass.pokeTypeLogoPoison}`,
        border: `${typesClass.pokeTypeLogoPoisonCardBorder}`
      };
    }
    else if(type === "bug") {
      return {
        card: `${typesClass.pokeTypeLogoBugCard}`, 
        logo: `${typesClass.pokeTypeLogoBug}`,
        border: `${typesClass.pokeTypeLogoBugCardBorder}`
      };
    }
    else if(type === "normal") {
      return {
        card: `${typesClass.pokeTypeLogoNormalCard}`, 
        logo: `${typesClass.pokeTypeLogoNormal}`,
        border: `${typesClass.pokeTypeLogoNormalCardBorder}`
      };
    }
    else if(type === "flying") {
      return {
        card: `${typesClass.pokeTypeLogoFlyingCard}`, 
        logo: `${typesClass.pokeTypeLogoFlying}`,
        border: `${typesClass.pokeTypeLogoFlyingCardBorder}`
      };
    }
    else if(type === "electric") {
      return {
        card: `${typesClass.pokeTypeLogoElectricCard}`, 
        logo: `${typesClass.pokeTypeLogoElectric}`,
        border: `${typesClass.pokeTypeLogoElectricCardBorder}`
      };
    }
    else if(type === "ground") {
      return {
        card: `${typesClass.pokeTypeLogoGroundCard}`, 
        logo: `${typesClass.pokeTypeLogoGround}`,
        border: `${typesClass.pokeTypeLogoGroundCardBorder}`
      };
    }
    else if(type === "fairy") {
      return {
        card: `${typesClass.pokeTypeLogoFairyCard}`, 
        logo: `${typesClass.pokeTypeLogoFairy}`,
        border: `${typesClass.pokeTypeLogoFairyCardBorder}`
      };
    }
    else if(type === "fighting") {
      return {
        card: `${typesClass.pokeTypeLogoFightingCard}`, 
        logo: `${typesClass.pokeTypeLogoFighting}`,
        border: `${typesClass.pokeTypeLogoFightingCardBorder}`
      };
    }
    else if(type === "psychic") {
      return {
        card: `${typesClass.pokeTypeLogoPsychicCard}`, 
        logo: `${typesClass.pokeTypeLogoPsychic}`,
        border: `${typesClass.pokeTypeLogoPsychicCardBorder}`
      };
    }
    else if(type === "rock") {
      return {
        card: `${typesClass.pokeTypeLogoRockCard}`, 
        logo: `${typesClass.pokeTypeLogoRock}`,
        border: `${typesClass.pokeTypeLogoRockCardBorder}`
      };
    }
    else if(type === "steel") {
      return {
        card: `${typesClass.pokeTypeLogoSteelCard}`, 
        logo: `${typesClass.pokeTypeLogoSteel}`,
        border: `${typesClass.pokeTypeLogoSteelCardBorder}`
      };
    }
    else if(type === "ice") {
      return {
        card: `${typesClass.pokeTypeLogoIceCard}`, 
        logo: `${typesClass.pokeTypeLogoIce}`,
        border: `${typesClass.pokeTypeLogoIceCardBorder}`
      };
    }
    else if(type === "ghost") {
      return {
        card: `${typesClass.pokeTypeLogoGhostCard}`, 
        logo: `${typesClass.pokeTypeLogoGhost}`,
        border: `${typesClass.pokeTypeLogoGhostCardBorder}`
      };
    }
    else if(type === "dragon") {
      return {
        card: `${typesClass.pokeTypeLogoDragonCard}`, 
        logo: `${typesClass.pokeTypeLogoDragon}`,
        border: `${typesClass.pokeTypeLogoDragonCardBorder}`
      };
    }
    else if(type === "dark") {
      return {
        card: `${typesClass.pokeTypeLogoDarkCard}`, 
        logo: `${typesClass.pokeTypeLogoDark}`,
        border: `${typesClass.pokeTypeLogoDarkCardBorder}`
      };
    }
    return type;
  });
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const seralizedState = JSON.stringify(state);
    localStorage.setItem("state", seralizedState);
  } catch (err) {
    console.log(err);
  }
};