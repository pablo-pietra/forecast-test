import { useEffect, useContext } from "react";
import AppContext from "../../AppContext";

const ErrorToast = () => {
  const { error, setError } = useContext(AppContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (error) setError("");
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [error, setError]);

  return (
    <div className="absolute top-[100px] left-0 right-0 my-0 mx-auto w-full md:w-1/2">
      <div className="flex p-4 m-4 rounded-lg shadow bg-red-200">
        <button
          className="text-white bg-red-600 font-semibold rounded w-6 mr-4"
          onClick={() => setError("")}
        >
          X
        </button>
        <div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorToast;
