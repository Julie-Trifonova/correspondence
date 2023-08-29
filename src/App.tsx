import React from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Header } from "@components/Header/Header";
import { IncomingDocument } from "@components/IncomingDocument/IncomingDocument";
import { OutgoingDocument } from "@components/OutgoingDocument/OutgoingDocument";
import { connect, Provider } from "react-redux";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { compose } from "redux";

import { IncomingCorrespondence } from "./pages/IncomingCorrespondence/IncomingCorrespondence";
import { OutgoingCorrespondence } from "./pages/OutgoingCorrespondence/OutgoingCorrespondence";
import store from "./redux/reduxStore";

function App() {
  return (
    <>
      <HashRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route
              path="/correspondence_system/incomingCorrespondence"
              element={<IncomingCorrespondence />}
            />
            <Route
              path="/correspondence_system/outgoingCorrespondence"
              element={<OutgoingCorrespondence />}
            />
            <Route
              path="/correspondence_system/incomingCorrespondence/:documentId"
              element={<IncomingDocument />}
            />
            <Route
              path="/correspondence_system/outgoingCorrespondence/:documentId"
              element={<OutgoingDocument />}
            />
            <Route path="*" element={<div>404 NOT FOUND</div>} />
          </Routes>
        </Provider>
      </HashRouter>
    </>
  );
}

// const mapStateToProps = (state: any) => ({
//   // initialized: state.app.initialized
// });

// let AppContainer = compose(connect(mapStateToProps, {}))(App);

// const SamuraiJSApp: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <Provider store={store}>
//         <AppContainer />
//       </Provider>
//     </BrowserRouter>
//   );
// };

export { App };
