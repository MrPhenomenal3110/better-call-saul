import { Button } from "@components/Button";
import SaulGoodman from "assets/saul-goodman.png";

const ChatHeader = () => (
  <div className="sticky top-0 z-10 bg-white shadow-sm p-6 flex flex-row items-center justify-between gap-4">
    <div className="flex flex-row items-start justify-start gap-4">
      <img
        className="h-12 w-12 object-cover rounded-full"
        src={SaulGoodman}
        alt="saul-goodman-profile-pic"
      />
      <div className="flex flex-col items-start justify-start gap-1">
        <h2 className="text-lg text-gray-800 font-extrabold">Saul Goodman</h2>
        <span className="text-gray-600 font-thin text-sm">
          Better call Saul...
        </span>
      </div>
    </div>
    <Button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }}
      className="bg-red-200/60 hover:bg-red-200 border border-red-600 text-red-600! rounded-lg"
    >
      Logout
    </Button>
  </div>
);

export default ChatHeader;
