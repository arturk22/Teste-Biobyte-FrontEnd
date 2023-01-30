import React from "react";
import { render } from "react-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import SignupForm from './signupForm';


const options = {
  timeout: 5000,
  position: "bottom center",
};

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <SignupForm />
    </AlertProvider>
    
  );
}

export default App;

render(<App />, document.getElementById("root"));