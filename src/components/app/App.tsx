import { useCookies } from "react-cookie";
import { Worker } from "../../api/Model";
import WorkerForm from "../workerform/WorkerForm";

function App() {
  const [cookies, setCookie] = useCookies<string, { worker: Worker }>([
    "worker",
  ]);

  return (
    <div>
      <WorkerForm
        defaultValue={cookies?.worker}
        onSave={(worker: Worker) => setCookie("worker", worker)}
      />
    </div>
  );
}

export default App;
