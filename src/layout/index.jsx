import Header from "./Header";
import Footer from "./Footer";

// import { Roboto } from "next/font/google";

// const roboto = Roboto({
//   subset: ["latin"],
//   weight: ["300", "400", "700"],
//   style: ["normal", "italic"],
// });

function Layout(props) {
  return (
    // <div
    //   className={`relative flex min-h-screen min-w-screen flex-col ${roboto.className} bg-gradient-to-t from-[#143d5c00] to-[#143d5c]`}
    // >
    <div
      className={`relative flex min-h-screen min-w-screen flex-col  bg-gradient-to-t from-[#143d5c00] to-[#143d5c]`}
    >
      <Header />

      {/* APP BODY */}
      <div className="flex-1 overflow-y-auto m-10 p-5  ">{props.children}</div>

      <Footer />
    </div>
  );
}

export default Layout;
