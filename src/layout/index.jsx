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
    <div
      className={`relative flex min-h-screen min-w-screen flex-col bg-[var(--background)]`}
    >
      <Header />

      {/* APP BODY */}
      <div className="flex-1 overflow-y-auto">{props.children}</div>

      <Footer />
    </div>
  );
}

export default Layout;
