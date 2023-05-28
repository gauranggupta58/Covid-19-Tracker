import React from "react";
import numeral from "numeral";

import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",

    mulitiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",

    mulitiplier: 1200,
  },
  deaths: {
    hex: " #333333",

    mulitiplier: 2000,
  },
};
export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType] / 10) *
        casesTypeColors[casesType].mulitiplier
      }
    >
      <Popup>
        <div classname="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases:{numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered:{numeral(country.cases).format("0,0")}
          </div>
          <div className="info-deaths">
            deaths:{numeral(country.cases).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
