import React from "react";
import { Client, Status } from "@googlemaps/google-maps-services-js";

export default class StreetView extends React.Component {
  componentDidMount() {
    const client = new Client({});
  }
  render() {
    return (
      <div>
        <h1>Heyo!</h1>
      </div>
    );
  }
}
