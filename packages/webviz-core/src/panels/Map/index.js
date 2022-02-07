// @flow
// eslint-disable-next-line header/header
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { useRosLib, MapPanel as Map } from "scene-viewer-panels";
import "scene-viewer-panels/index.css";
import styled from "styled-components";

import Panel from "webviz-core/src/components/Panel";
import PanelToolbar from "webviz-core/src/components/PanelToolbar";
import useGlobalVariables from "webviz-core/src/hooks/useGlobalVariables";

import { ROSBRIDGE_WEBSOCKET_URL_QUERY_KEY } from "webviz-core/src/util/globalConstants";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const params = new URLSearchParams(window.location.search);
const websocketUrl = params.get(ROSBRIDGE_WEBSOCKET_URL_QUERY_KEY) || "ws://localhost:9090";

function MapPanel(): React.Node {
  const { currentPosition, trajectory } = useRosLib({
    websocketUrl,
    topicNames: ["/sensing/gnss/ublox/nav_sat_fix", "/scene_viewer/vehicle_trajectory"],
  });

  const { globalVariables } = useGlobalVariables();
  const pinLocations = globalVariables.pinLocations || [];

  return (
    <Container>
      <PanelToolbar floating />
      <Map
        centerPosition={[35.1505536926114, 136.96585423505437]}
        currentPosition={[currentPosition.latitude, currentPosition.longitude]}
        markers={pinLocations.map((item) => {
          return {
            longitude: item.longitude,
            latitude: item.latitude,
            popupText: item.description,
            text: item.label,
          };
        })}
        polylines={[
          {
            positions: trajectory.map((item) => {
              return [item.latitude, item.longitude];
            }),
          },
        ]}
      />
    </Container>
  );
}

MapPanel.panelType = "MapPanel";
MapPanel.defaultConfig = {};

export default hot(Panel<{}>(MapPanel));
