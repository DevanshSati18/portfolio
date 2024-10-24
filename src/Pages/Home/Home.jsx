import LeftHomePage from "./LeftHomePage";
import RightHomePage from "./RightHomePage";
const Home =()=>{
    return(
        <div className="flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center p-8 lg:h-screen h-[100vh]">
        <LeftHomePage />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8 lg:h-screen h-[100vh]">
        <RightHomePage />
      </div>
    </div>
  );
};

export default Home;