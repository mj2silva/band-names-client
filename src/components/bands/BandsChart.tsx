import { FC, useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { SocketContext } from "../../socket/SocketProvider";
import { Band } from "./types";

const getRandomColor = ({ opacity = 1 }: { opacity?: number } = {}): string => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const BandsChart: FC = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState<Band[]>();

  useEffect(() => {
    if (!socket) return;
    socket.on("current-bands", (data) => {
      setBands(data.bands);
    });
    return () => {
      socket.off("current-bands");
    };
  }, [socket]);

  return (
    <Bar
      options={{ scales: { xAxes: { stacked: true } } }}
      data={{
        labels: bands?.map((band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands?.map((band) => band.votes),
            backgroundColor: bands?.map(() => getRandomColor({ opacity: 0.2 })),
            borderColor: bands?.map(() => getRandomColor()),
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
export default BandsChart;
