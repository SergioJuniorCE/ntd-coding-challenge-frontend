import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as any;
  console.error(error);
  return (
    <div id="error-page" className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-9xl font-bold">{error.statusText}</h1>
      <h2 className="text-4xl font-bold">{error.message}</h2>
    </div>
  )
}

export default ErrorPage