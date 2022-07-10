import { useCookies } from "react-cookie";
import { Worker } from "../../api/Model";
import WorkerForm from "../../components/WorkerForm";

function FormView() {
  const [cookies, setCookie] = useCookies<string, { worker: Worker }>([
    "worker",
  ]);

  return (
    <div className="bg-purple-100 flex md:items-center justify-center h-screen">
      <WorkerForm
        defaultValue={cookies?.worker}
        onSave={(worker: Worker) => setCookie("worker", worker)}
      />
    </div>
  );
}

export default FormView;
