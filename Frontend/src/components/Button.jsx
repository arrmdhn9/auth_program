import { useNavigate } from "react-router-dom";

function Button() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="px-2 py-2 bg-red-600 rounded-md text-white"
        onClick={() => navigate("/login")}>
        LoginPage
      </button>
    </div>
  );
}

export default Button;
