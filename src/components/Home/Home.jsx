import React from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "../Footer/Footer";

export default function Home(props) {
  return (
    <div className='App'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
