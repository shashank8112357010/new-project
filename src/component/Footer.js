import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://www.wingstechsolutions.com/">
              WINGS TECH SOLUTIONS
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://www.wingstechsolutions.com/about-us/">
              About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://www.wingstechsolutions.com/portfolio/">
              Blog
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made with{" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <a
            href="https://www.linkedin.com/mynetwork"
            target="_blank"
          >
            Shashank sharma
          </a>{" "}
          for a better web.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
