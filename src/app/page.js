import ScreenShare from "@/components/ScreenShare";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Screen Sharing Web App</h1>
      <ScreenShare />
    </div>
  );
}
