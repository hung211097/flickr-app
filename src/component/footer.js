import React, { Component } from 'react';
import '../styles/footer.css';
import {facebookSquare} from 'react-icons-kit/fa/facebookSquare'
import {twitter} from 'react-icons-kit/fa/twitter'
import {tumblrSquare} from 'react-icons-kit/fa/tumblrSquare'
import { Icon } from 'react-icons-kit'

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer-full-view">
          <footer className="foot">
            <div className="foot-container">
              <div className="foot-top-row">
                <ul className="foot-nav-ul">
                  <li className="foot-li">
                    <a>About</a>
                  </li>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <li className="foot-li">
                    <a>Jobs</a>
                  </li>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <li className="foot-li">
                    <a>Blog</a>
                  </li>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <li className="foot-li">
                    <a>Developers</a>
                  </li>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <li className="foot-li">
                    <a>Guidelines</a>
                  </li>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <li className="foot-li">
                    <a>Report abuse</a>
                  </li>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <li className="foot-li">
                    <a>Help forum</a>
                  </li>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <li className="foot-li">
                    <a>English</a>
                  </li>
                </ul>
              </div>
              <div className="foot-bottom-row">
                <div className="foot-yahoo">
                  <ul className="foot-nav-ul">
                    <li className="foot-li">
                      <a>Privacy</a>
                    </li>
                    &emsp;&emsp;&emsp;&emsp;&emsp;
                    <li className="foot-li">
                      <a>Terms</a>
                    </li>
                    &emsp;&emsp;&emsp;&emsp;&emsp;
                    <li className="foot-li">
                      <a>Help</a>
                    </li>
                  </ul>
                </div>
                <div className="foot-company"></div>
                <div className="foot-social">
                  <ul className="foot-nav-ul">
                    <li className="foot-li">
                      <a><Icon icon={tumblrSquare} size={25}/></a>
                    </li>
                    <li className="foot-li">
                      <a><Icon icon={facebookSquare} size={25}/></a>
                    </li>
                    <li className="foot-li">
                      <a><Icon icon={twitter} size={25}/></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Footer;
