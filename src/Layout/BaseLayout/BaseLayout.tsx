import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Layout, Row, Col } from 'antd';

import './BaseLayout.scss';
import { FileSearchOutlined } from '@ant-design/icons';

const BaseLayout = (props: any) => {
  const { Header, Content, Footer } = Layout;
  const { component } = props;
  const activeLinkClassName = 'nav-link-active';

  const currentPath = window.location.pathname;

  const getNavLinkClassName = (path: any) => {
    if (path === currentPath) {
      return classNames('nav-link', activeLinkClassName);
    }
    return 'nav-link';
  };

  return (
    <Layout>
      <Header>
        <Row>
          <Col span={4}>
            <div className="logo">
              <Link to="/">
                <img
                  className="logo"
                  src="/images/agolo-logo-horizontal.svg"
                  alt="agolo-logo"
                />
              </Link>
            </div>
          </Col>
          <Col span={20}>
            <ul className="navbar">
              <li>
                <Link
                  className={getNavLinkClassName('/summarizer')}
                  to="/summarizer"
                >
                  ESG Report Summarization
                </Link>
              </li>
              <li>
                <Link className={getNavLinkClassName('/upload')} to="/upload">
                  Upload PDF
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/login" aria-disabled>
                  Logout
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Header>

      <Content>{component}</Content>

      <Footer>
        <div className="bg-curve bg-footer-curve" />
      </Footer>
    </Layout>
  );
};

export default BaseLayout;
