import error from "../../assets/Error.png";

const ErrorPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <img
        src={error}
        alt="Error"
        className="w-[200px] sm:w-[300px] md:w-[375px] lg:w-[450px]"
      />
    </div>
  );
};

export default ErrorPage;
