import typesClass from "../shared-css/types.module.css"

////GETS ARRAY OF TYPES AND RETURNS ARRAY OF CLASS NAMES FOR typesClass
export const getTypesClass = (types) => {
  return types.map(type => {
    if(type === "fire") {
      return {
        card: `${typesClass.pokeTypeLogoFireCard}`, 
        logo: `${typesClass.pokeTypeLogoFire}`, 
        border: `${typesClass.pokeTypeLogoFireCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradFireCard}`
      }
    }
    else if(type === "water") {
      return {
        card: `${typesClass.pokeTypeLogoWaterCard}`, 
        logo: `${typesClass.pokeTypeLogoWater}`,
        border: `${typesClass.pokeTypeLogoWaterCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradWaterCard}`
      };
    }
    else if(type === "grass") {
      return {
        card: `${typesClass.pokeTypeLogoGrassCard}`, 
        logo: `${typesClass.pokeTypeLogoGrass}`,
        border: `${typesClass.pokeTypeLogoGrassCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradGrassCard}`
      };
    }
    else if(type === "poison") {
      return {
        card: `${typesClass.pokeTypeLogoPoisonCard}`, 
        logo: `${typesClass.pokeTypeLogoPoison}`,
        border: `${typesClass.pokeTypeLogoPoisonCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradPoisonCard}`
      };
    }
    else if(type === "bug") {
      return {
        card: `${typesClass.pokeTypeLogoBugCard}`, 
        logo: `${typesClass.pokeTypeLogoBug}`,
        border: `${typesClass.pokeTypeLogoBugCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradBugCard}`
      };
    }
    else if(type === "normal") {
      return {
        card: `${typesClass.pokeTypeLogoNormalCard}`, 
        logo: `${typesClass.pokeTypeLogoNormal}`,
        border: `${typesClass.pokeTypeLogoNormalCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradNormalCard}`
      };
    }
    else if(type === "flying") {
      return {
        card: `${typesClass.pokeTypeLogoFlyingCard}`, 
        logo: `${typesClass.pokeTypeLogoFlying}`,
        border: `${typesClass.pokeTypeLogoFlyingCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradFlyingCard}`
      };
    }
    else if(type === "electric") {
      return {
        card: `${typesClass.pokeTypeLogoElectricCard}`, 
        logo: `${typesClass.pokeTypeLogoElectric}`,
        border: `${typesClass.pokeTypeLogoElectricCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradElectricCard}`
      };
    }
    else if(type === "ground") {
      return {
        card: `${typesClass.pokeTypeLogoGroundCard}`, 
        logo: `${typesClass.pokeTypeLogoGround}`,
        border: `${typesClass.pokeTypeLogoGroundCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradGroundCard}`
      };
    }
    else if(type === "fairy") {
      return {
        card: `${typesClass.pokeTypeLogoFairyCard}`, 
        logo: `${typesClass.pokeTypeLogoFairy}`,
        border: `${typesClass.pokeTypeLogoFairyCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradFairyCard}`
      };
    }
    else if(type === "fighting") {
      return {
        card: `${typesClass.pokeTypeLogoFightingCard}`, 
        logo: `${typesClass.pokeTypeLogoFighting}`,
        border: `${typesClass.pokeTypeLogoFightingCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradFightingCard}`
      };
    }
    else if(type === "psychic") {
      return {
        card: `${typesClass.pokeTypeLogoPsychicCard}`, 
        logo: `${typesClass.pokeTypeLogoPsychic}`,
        border: `${typesClass.pokeTypeLogoPsychicCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradPsychicCard}`
      };
    }
    else if(type === "rock") {
      return {
        card: `${typesClass.pokeTypeLogoRockCard}`, 
        logo: `${typesClass.pokeTypeLogoRock}`,
        border: `${typesClass.pokeTypeLogoRockCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradRockCard}`
      };
    }
    else if(type === "steel") {
      return {
        card: `${typesClass.pokeTypeLogoSteelCard}`, 
        logo: `${typesClass.pokeTypeLogoSteel}`,
        border: `${typesClass.pokeTypeLogoSteelCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradSteelCard}`
      };
    }
    else if(type === "ice") {
      return {
        card: `${typesClass.pokeTypeLogoIceCard}`, 
        logo: `${typesClass.pokeTypeLogoIce}`,
        border: `${typesClass.pokeTypeLogoIceCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradIceCard}`
      };
    }
    else if(type === "ghost") {
      return {
        card: `${typesClass.pokeTypeLogoGhostCard}`, 
        logo: `${typesClass.pokeTypeLogoGhost}`,
        border: `${typesClass.pokeTypeLogoGhostCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradGhostCard}`
      };
    }
    else if(type === "dragon") {
      return {
        card: `${typesClass.pokeTypeLogoDragonCard}`, 
        logo: `${typesClass.pokeTypeLogoDragon}`,
        border: `${typesClass.pokeTypeLogoDragonCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradDragonCard}`
      };
    }
    else if(type === "dark") {
      return {
        card: `${typesClass.pokeTypeLogoDarkCard}`, 
        logo: `${typesClass.pokeTypeLogoDark}`,
        border: `${typesClass.pokeTypeLogoDarkCardBorder}`,
        gradCard: `${typesClass.pokeTypeLogoGradDarkCard}`
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