import { Header } from "../../shared/components/Header";
import { Navbar } from "../../shared/components/Navbar";
import { ProfilePage } from "../../shared/components/ProfilePage";

export default function Profile() {
  return (
    <div>
      <div style={{ marginLeft: "220px" }}>
        <Header />
        <Navbar />
        <ProfilePage />
      </div>
    </div>
  );
}