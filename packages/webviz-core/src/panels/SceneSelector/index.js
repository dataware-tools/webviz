// @flow
// eslint-disable-next-line header/header
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { useRosLib, SceneSelector } from "scene-viewer-panels";
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

function SceneSelectorPanel(): React.Node {
  const { captionsWithLocation, seekToTimestamp } = useRosLib({
    websocketUrl,
    topicNames: ["/scene_viewer/scene_captions_with_locations"],
  });
  const { setGlobalVariables } = useGlobalVariables();

  const setPinLocations = React.useCallback((pinLocations) => {
    setGlobalVariables({ pinLocations });
  }, [setGlobalVariables]);
  const captions = React.useMemo(
    () =>
      captionsWithLocation.map((item) => {
        return {
          timestamp: item.timestamp,
          caption: item.caption,
          location: {
            altitude: item.altitude,
            latitude: item.latitude,
            longitude: item.longitude,
          },
        };
      }),
    [captionsWithLocation]
  );

  return (
    <Container>
      <PanelToolbar floating />
      <SceneSelector
        captions={captions}
        setPinLocations={setPinLocations}
        onSelectScene={(timestamp) => {
          seekToTimestamp(timestamp);
        }}
      />
    </Container>
  );
}

SceneSelectorPanel.panelType = "SceneSelectorPanel";
SceneSelectorPanel.defaultConfig = {};

export default hot(Panel<{}>(SceneSelectorPanel));
