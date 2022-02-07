// @flow
// eslint-disable-next-line header/header
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { useRosLib, CurrentCaption } from "scene-viewer-panels";
import styled from "styled-components";

import Panel from "webviz-core/src/components/Panel";
import PanelToolbar from "webviz-core/src/components/PanelToolbar";

import { ROSBRIDGE_WEBSOCKET_URL_QUERY_KEY } from "webviz-core/src/util/globalConstants";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const params = new URLSearchParams(window.location.search);
const websocketUrl = params.get(ROSBRIDGE_WEBSOCKET_URL_QUERY_KEY) || "ws://localhost:9090";

function CurrentCaptionPanel(): React.Node {
  const { captions, seekToTimestamp, currentTime } = useRosLib({
    websocketUrl,
    topicNames: ["/scene_viewer/scene_captions", "/clock"],
  });
  return (
    <Container>
      <PanelToolbar floating />
      <CurrentCaption
        onChangeScene={({ timestamp }) => seekToTimestamp(timestamp)}
        currentTimestamp={currentTime}
        captions={captions}
      />
    </Container>
  );
}

CurrentCaptionPanel.panelType = "CurrentCaptionPanel";
CurrentCaptionPanel.defaultConfig = {};

export default hot(Panel<{}>(CurrentCaptionPanel));
