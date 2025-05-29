import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-row justify-center items-center min-h-screen font-bold ">
      <div>
        <div>
          <title>Contact Me</title>
        </div>

        <p>Have questions, feedback, or suggestions? Feel free to reach out!</p>

        <div className="flex flex-row items-center">
          <p>You can contact me directly via my socials: </p>
          <Link href="https://www.linkedin.com/in/thaodev">
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
}
