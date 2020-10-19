/*eslint-disable*/
import React from 'react'
import { server_url } from '../../config/config'
// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap'

function AuthFooter(props) {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {'2020-21'}{' '}
                <a className="font-weight-bold ml-1" href={server_url} style={{ fontFamily: 'Monoton' }}>
                  OLO
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink href={server_url} style={{ fontFamily: 'Monoton' }}>OLO</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://ecommero.ninjascode.com/pages/ourteam.html"
                    target="_blank">
                    {'About Us'}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://medium.com/@sharangohar"
                    target="_blank">
                    {'Blog'}
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default AuthFooter
