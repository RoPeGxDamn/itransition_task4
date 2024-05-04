import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Container, Toast, ToastContainer } from "react-bootstrap";
import { useToast } from "../context/ToastProvider";

export default function Layout() {
  const { params, setParams } = useToast();
  return (
    <>
      <Header />
      <main className="main">
        <Container>
          <div className="main__content">
            <Outlet />
          </div>
        </Container>
        <ToastContainer
          position="bottom-center"
          style={{ marginBottom: "100px" }}
        >
          <Toast
            show={params?.show}
            onClose={() => setParams({ ...params, show: false })}
            bg={params?.variant}
            delay={3000}
            autohide
          >
            <Toast.Header>Message</Toast.Header>
            <Toast.Body>{params?.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </main>
      <Footer />
    </>
  );
}
