import AddBand from "./components/bands/AddBand";
import BandList from "./components/bands/BandList";
import ServerStatus from "./components/ServerStatus";
import SocketProvider from "./socket/SocketProvider";
import BandsChart from "./components/bands/BandsChart";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
} from "chart.js";

ChartJs.register(BarElement, CategoryScale, LinearScale);

function App() {
  return (
    <SocketProvider>
      <div className="container">
        <div className="row">
          <ServerStatus />
          <h2>Band Names</h2>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <BandsChart />
          </div>
          <div className="col-6">
            <div className="mb-3">
              <AddBand />
            </div>
            <BandList />
          </div>
        </div>
      </div>
    </SocketProvider>
  );
}

export default App;
