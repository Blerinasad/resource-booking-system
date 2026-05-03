import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

export default function UnauthorizedPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-5 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-black text-red-300">Unauthorized</h1>
        <p className="mt-3 text-slate-400">You do not have permission to access this page.</p>
        <Link to="/dashboard" className="mt-8 inline-block"><Button>Back to dashboard</Button></Link>
      </div>
    </div>
  );
}
