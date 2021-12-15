// @flow
// eslint-disable-next-line header/header
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { useRosLib, SceneSelector } from "scene-viewer-panels";
import styled from "styled-components";

import Panel from "webviz-core/src/components/Panel";
import PanelToolbar from "webviz-core/src/components/PanelToolbar";
import useGlobalVariables from "webviz-core/src/hooks/useGlobalVariables";

const Container = styled.div`
  padding: 16px;
  overflow-y: auto;
  ul {
    font-size: 10px;
    margin-left: 8px;
  }
  li {
    margin: 4px 0;
  }
  h1 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }
  section {
    flex: 1 1 50%;
    overflow: hidden;
  }
`;

function SceneSelectorPanel(): React.Node {
  const { captionsWithLocation, seekToTimestamp } = useRosLib({
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
