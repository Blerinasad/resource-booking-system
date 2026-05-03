import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-5 text-white">
      <div className="text-center">
        <h1 className="text-8xl font-black text-cyan-300">404</h1>
        <p className="mt-4 text-xl font-bold">Page not found</p>
        <p className="mt-2 text-slate-400">The page you requested does not exist.</p>
        <Link to="/dashboard" className="mt-8 inline-block"><Button>Back to dashboard</Button></Link>
      </div>
    </div>
  );
}
