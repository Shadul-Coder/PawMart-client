import error from "../../assets/Error.png";

const ErrorPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <img
        src={error}
        alt="Error"
        className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px]"
      />
    </div>
  );
};

export default ErrorPage;
