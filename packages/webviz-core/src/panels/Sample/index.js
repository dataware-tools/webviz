// @flow
// eslint-disable-next-line header/header
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Sample as SampleBody } from "scene-viewer-panels";
import styled from "styled-components";

import Panel from "webviz-core/src/components/Panel";
import PanelToolbar from "webviz-core/src/components/PanelToolbar";

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

function Sample(): React.Node {
  return (
    <Container>
      <PanelToolbar floating />
      <SampleBody />
    </Container>
  );
}

Sample.panelType = "Sample";
Sample.defaultConfig = {};

export default hot(Panel<{}>(Sample));
