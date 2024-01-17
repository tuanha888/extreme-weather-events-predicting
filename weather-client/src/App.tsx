import MyForm from "./components/Form";
import Images from "./components/Images";
import Loading from "./components/Loading";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <p className="navbar-header">Extreme weather events predicting</p>
      </div>
      <div className="app-wrapper">
        <MyForm />
        <Loading />
      </div>
      <Images />
    </div>
  );
}

export default App;
