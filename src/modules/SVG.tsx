import React from 'react';
import { SVGProps } from './types';

function SVG({
  type,
  width,
  height,
  fill,
  stroke
}: SVGProps): React.JSX.Element {
  switch (type) {
    case 'notFound':
      return (
        <svg
          width={width !== undefined ? width : '35px'}
          height={height !== undefined ? height : '35px'}
          viewBox="-20 10 190 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M38.155 140.475L48.988 62.1108L92.869 67.0568L111.437 91.0118L103.396 148.121L38.155 140.475ZM84.013 94.0018L88.827 71.8068L54.046 68.3068L44.192 135.457L98.335 142.084L104.877 96.8088L84.013 94.0018ZM59.771 123.595C59.394 123.099 56.05 120.299 55.421 119.433C64.32 109.522 86.05 109.645 92.085 122.757C91.08 123.128 86.59 125.072 85.71 125.567C83.192 118.25 68.445 115.942 59.771 123.595ZM76.503 96.4988L72.837 99.2588L67.322 92.6168L59.815 96.6468L56.786 91.5778L63.615 88.1508L59.089 82.6988L64.589 79.0188L68.979 85.4578L76.798 81.5328L79.154 86.2638L72.107 90.0468L76.503 96.4988Z"
            fill="#000000"
          />
        </svg>
      );
    case 'play':
      return (
        <svg
          fill={fill !== undefined ? fill : '#000'}
          width={width !== undefined ? width : '35px'}
          height={height !== undefined ? height : '35px'}
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z"></path>
        </svg>
      );
    case 'stop':
      return (
        <svg
          fill={fill !== undefined ? fill : '#000'}
          width={width !== undefined ? width : '35px'}
          height={height !== undefined ? height : '35px'}
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z"></path>
        </svg>
      );
    case 'mike':
      return (
        <svg
          width={width !== undefined ? width : '35px'}
          height={height !== undefined ? height : '35px'}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 348.165 348.165"
          xmlSpace="preserve"
        >
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <path
                          d="M194.752,329.165c-5.5,0-9.98-4.43-9.98-9.93V257.66c0-5.5-4.52-10.495-10.02-10.495h-1.34
								c-5.5,0-9.641,4.995-9.641,10.495v61.576c0,5.5-4.859,9.93-10.359,9.93h-33.848c-5.5,0-10,3.223-10,7c0,3.776,4.5,7,10,7
								H228.6c5.5,0,10-3.224,10-7c0-3.777-4.5-7-10-7H194.752z"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <path
                          d="M228.6,348.165H119.565c-8.271,0-15-5.383-15-12c0-6.617,6.729-12,15-12h33.848c2.855,0,5.359-2.304,5.359-4.93
								v-61.576c0-8.544,6.568-15.494,14.641-15.494h1.34c8.142,0,15.02,7.096,15.02,15.494v61.576c0,2.718,2.234,4.93,4.98,4.93
								H228.6c8.271,0,15,5.383,15,12C243.6,342.782,236.871,348.165,228.6,348.165z M119.565,334.165
								c-3.134,0-4.878,1.551-5.004,2.043c0.126,0.406,1.87,1.957,5.004,1.957H228.6c3.134,0,4.878-1.551,5.004-2.043
								c-0.126-0.406-1.87-1.957-5.004-1.957h-33.848c-8.26,0-14.98-6.697-14.98-14.93v-61.576c0-2.875-2.393-5.494-5.02-5.494
								h-1.34c-2.776,0-4.641,2.841-4.641,5.494v61.576c0,8.093-7.034,14.93-15.359,14.93H119.565z"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#000001"
                        d="M176.113,261.133h-4.063c-26.731,0-53.84-10.418-74.375-28.582
							c-22.478-19.879-35.371-47.499-35.371-75.775c0-8.284,6.716-15,15-15c8.284,0,15,6.716,15,15
							c0,19.686,9.202,39.114,25.246,53.304c15.127,13.38,34.991,21.054,54.5,21.054h4.063c19.51,0,39.374-7.674,54.5-21.053
							c16.045-14.191,25.247-33.619,25.247-53.305c0-8.284,6.716-15,15-15c8.284,0,15,6.716,15,15
							c0,28.275-12.892,55.895-35.371,75.776C229.954,250.715,202.845,261.133,176.113,261.133z"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M224.646,150.587c0,24.711-24.261,44.743-48.969,44.743h-3.187c-24.709,0-48.971-20.032-48.971-44.743V49.741
							C123.519,25.031,147.78,5,172.489,5h3.187c24.708,0,48.969,20.031,48.969,44.742V150.587z"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M175.676,200.33h-3.187c-28.751,0-53.971-23.244-53.971-49.742V49.741C118.519,23.243,143.738,0,172.49,0h3.187
							c28.75,0,53.969,23.243,53.969,49.741v100.847C229.646,177.086,204.426,200.33,175.676,200.33z M172.49,10
							c-23.013,0-43.971,18.942-43.971,39.741v100.847c0,20.8,20.958,39.742,43.971,39.742h3.187
							c23.012,0,43.969-18.942,43.969-39.742V49.741c0-20.799-20.958-39.741-43.969-39.741H172.49z"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      );
    case 'time':
      return (
        <svg
          width={width !== undefined ? width : '35px'}
          height={height !== undefined ? height : '35px'}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
            fill={fill !== undefined ? fill : '#000'}
          />
          <path
            d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
            fill={fill !== undefined ? fill : '#000'}
          />
        </svg>
      );
    case 'back':
      return (
        <svg
          fill={fill !== undefined ? fill : '#000'}
          width={width !== undefined ? width : '35px'}
          height={height !== undefined ? height : '35px'}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          enableBackground="new 0 0 52 52"
          xmlSpace="preserve"
        >
          <path
            d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c0.6-0.6,0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0
	L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29
	h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z"
          />
        </svg>
      );
    case 'category':
      return (
        <svg
          fill={fill !== undefined ? fill : '#000'}
          width={width !== undefined ? width : '35px'}
          height={height !== undefined ? height : '35px'}
          viewBox="0 0 64 64"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlSpace="preserve"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <rect
            id="Icons"
            x="-384"
            y="-320"
            width="1280"
            height="800"
            fill="none"
          />
          <g id="Icons1">
            <g id="Strike"></g>
            <g id="H1"></g>
            <g id="H2"></g>
            <g id="H3"></g>
            <g id="list-ul"></g>
            <g id="hamburger-1"></g>
            <g id="hamburger-2"></g>
            <g id="list-ol"></g>
            <g id="list-task"></g>
            <g id="trash"></g>
            <g id="vertical-menu"></g>
            <g id="horizontal-menu"></g>
            <g id="sidebar-2"></g>
            <g id="Pen"></g>
            <g id="Pen1"></g>
            <g id="clock"></g>
            <g id="external-link"></g>
            <g id="hr"></g>
            <g id="info"></g>
            <g id="warning"></g>
            <g id="plus-circle"></g>
            <g id="minus-circle"></g>
            <g id="vue"></g>
            <g id="cog"></g>
            <g id="logo"></g>
            <g id="radio-check"></g>
            <g id="eye-slash"></g>
            <g id="eye"></g>
            <g id="toggle-off"></g>
            <g id="shredder"></g>
            <g>
              <path d="M9.89,30.496c-1.14,1.122 -1.784,2.653 -1.791,4.252c-0.006,1.599 0.627,3.135 1.758,4.266c3.028,3.028 7.071,7.071 10.081,10.082c2.327,2.326 6.093,2.349 8.448,0.051c5.91,-5.768 16.235,-15.846 19.334,-18.871c0.578,-0.564 0.905,-1.338 0.905,-2.146c0,-4.228 0,-17.607 0,-17.607l-17.22,0c-0.788,0 -1.544,0.309 -2.105,0.862c-3.065,3.018 -13.447,13.239 -19.41,19.111Zm34.735,-15.973l0,11.945c0,0.811 -0.329,1.587 -0.91,2.152c-3.069,2.981 -13.093,12.718 -17.485,16.984c-1.161,1.127 -3.012,1.114 -4.157,-0.031c-2.387,-2.386 -6.296,-6.296 -8.709,-8.709c-0.562,-0.562 -0.876,-1.325 -0.872,-2.12c0.003,-0.795 0.324,-1.555 0.892,-2.112c4.455,-4.373 14.545,-14.278 17.573,-17.25c0.561,-0.551 1.316,-0.859 2.102,-0.859c3.202,0 11.566,0 11.566,0Zm-7.907,2.462c-1.751,0.015 -3.45,1.017 -4.266,2.553c-0.708,1.331 -0.75,2.987 -0.118,4.356c0.836,1.812 2.851,3.021 4.882,2.809c2.042,-0.212 3.899,-1.835 4.304,-3.896c0.296,-1.503 -0.162,-3.136 -1.213,-4.251c-0.899,-0.953 -2.18,-1.548 -3.495,-1.57c-0.031,-0.001 -0.062,-0.001 -0.094,-0.001Zm0.008,2.519c1.105,0.007 2.142,0.849 2.343,1.961c0.069,0.384 0.043,0.786 -0.09,1.154c-0.393,1.079 -1.62,1.811 -2.764,1.536c-1.139,-0.274 -1.997,-1.489 -1.802,-2.67c0.177,-1.069 1.146,-1.963 2.27,-1.981c0.014,0 0.029,0 0.043,0Z" />
              <path d="M48.625,13.137l0,4.001l3.362,0l0,11.945c0,0.811 -0.328,1.587 -0.909,2.152c-3.069,2.981 -13.093,12.717 -17.485,16.983c-1.161,1.128 -3.013,1.114 -4.157,-0.03l-0.034,-0.034l-1.016,0.993c-0.663,0.646 -1.437,1.109 -2.259,1.389l1.174,1.174c2.327,2.327 6.093,2.35 8.447,0.051c5.91,-5.768 16.235,-15.845 19.335,-18.87c0.578,-0.565 0.904,-1.339 0.904,-2.147c0,-4.227 0,-17.607 0,-17.607l-7.362,0Z" />
            </g>
            <g id="spinner--loading--dots-"></g>
            <g id="react"></g>
            <g id="check-selected"></g>
            <g id="turn-off"></g>
            <g id="code-block"></g>
            <g id="user"></g>
            <g id="coffee-bean"></g>
            <g id="coffee-beans">
              <g id="coffee-bean1"></g>
            </g>
            <g id="coffee-bean-filled"></g>
            <g id="coffee-beans-filled">
              <g id="coffee-bean2"></g>
            </g>
            <g id="clipboard"></g>
            <g id="clipboard-paste"></g>
            <g id="clipboard-copy"></g>
            <g id="Layer1"></g>
          </g>
        </svg>
      );
    case 'search':
      return (
        <svg
          fill="none"
          width={width !== undefined ? width : '25px'}
          height={height !== undefined ? height : '25px'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"
            fill={fill !== undefined ? fill : '#000'}
          />
        </svg>
      );
    case 'trash':
      return (
        <svg
          width={width !== undefined ? width : '30px'}
          height={height !== undefined ? height : '30px'}
          viewBox="0 0 1024 1024"
          className="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M692.2 182.2V72.9H327.8v109.3H145.6v72.9h728.8v-72.9H692.2z m-291.5 0v-36.4h218.6v36.4H400.7zM730.8 874.5H289.2l-34.3-548.8-72.8 4.5 38.6 617.2h578.6l38.6-617.2-72.8-4.5z"
            fill={fill !== undefined ? fill : '#000'}
          />
          <path
            d="M400.7 400.8h72.9v437.3h-72.9zM546.4 400.8h72.9v437.3h-72.9z"
            fill={fill !== undefined ? fill : '#000'}
          />
        </svg>
      );
    case 'close':
      return (
        <svg
          width={width !== undefined ? width : '30px'}
          height={height !== undefined ? height : '30px'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Menu / Close_MD">
            <path
              id="Vector"
              d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
              stroke={fill !== undefined ? fill : '#000'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );
    case 'dnd':
      return (
        <svg
          width={width !== undefined ? width : '35px'}
          height={height !== undefined ? height : '35px'}
          viewBox="0 0 24 24"
          fill={fill !== undefined ? fill : '#000'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Interface / Drag_Horizontal">
            <g id="Vector">
              <path
                d="M18 14C17.4477 14 17 14.4477 17 15C17 15.5523 17.4477 16 18 16C18.5523 16 19 15.5523 19 15C19 14.4477 18.5523 14 18 14Z"
                stroke={fill !== undefined ? fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14Z"
                stroke={fill !== undefined ? fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 14C5.44772 14 5 14.4477 5 15C5 15.5523 5.44772 16 6 16C6.55228 16 7 15.5523 7 15C7 14.4477 6.55228 14 6 14Z"
                stroke={fill !== undefined ? fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 8C17.4477 8 17 8.44772 17 9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9C19 8.44772 18.5523 8 18 8Z"
                stroke={fill !== undefined ? fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8Z"
                stroke={fill !== undefined ? fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8Z"
                stroke={fill !== undefined ? fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>
      );
    case 'add':
      return (
        <svg
          width={width !== undefined ? width : '35px'}
          height={height !== undefined ? height : '35px'}
          fill={fill !== undefined ? fill : '#000'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Zm5-9a1,1,0,0,1-1,1H13v3a1,1,0,0,1-2,0V13H8a1,1,0,0,1,0-2h3V8a1,1,0,0,1,2,0v3h3A1,1,0,0,1,17,12Z" />
        </svg>
      );
    case 'modify':
      return (
        <svg
          width={width !== undefined ? width : '30px'}
          height={height !== undefined ? height : '30px'}
          viewBox="0 -1 119 119"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g
            fill={fill !== undefined ? fill : '#000'}
            fillRule="evenodd"
            id="Page-1"
            stroke="none"
            strokeWidth="1"
          >
            <g fillRule="nonzero" id="edit">
              <path
                d="M114.2,108.3 L4.8,108.3 C2.5,108.3 0.7,110.2 0.7,112.4 C0.7,114.6 2.6,116.5 4.8,116.5 L114.3,116.5 C116.6,116.5 118.4,114.6 118.4,112.4 C118.4,110.2 116.5,108.3 114.2,108.3 Z"
                fill={fill !== undefined ? fill : '#000'}
                id="Shape"
              />
              <path
                d="M0.7,72 L0.6,91.5 C0.6,92.6 1,93.7 1.8,94.5 C2.6,95.3 3.6,95.7 4.7,95.7 L24.1,95.6 C25.2,95.6 26.2,95.2 27,94.4 L94,27.4 C95.6,25.8 95.6,23.2 94,21.5 L74.8,2.1 C73.2,0.5 70.6,0.5 68.9,2.1 L55.5,15.6 L1.9,69.1 C1.2,69.9 0.7,70.9 0.7,72 Z M71.9,10.9 L85.4,24.4 L77.8,32 L64.3,18.5 L71.9,10.9 Z M9,73.8 L58.4,24.4 L71.9,37.9 L22.5,87.2 L8.9,87.3 L9,73.8 Z"
                fill={fill !== undefined ? fill : '#000'}
                id="Shape"
              />
            </g>
          </g>
        </svg>
      );
    default:
      return (
        <svg
          fill={fill !== undefined ? fill : '#000'}
          width={width !== undefined ? width : '25px'}
          height={height !== undefined ? height : '25px'}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M7.35,9.8H8.63V8.56H7.35ZM9.6,3.49h0A2.9,2.9,0,0,0,7.88,3a2.38,2.38,0,0,0-1.32.35,2.13,2.13,0,0,0-.91,1.84H7a1.36,1.36,0,0,1,.22-.73.83.83,0,0,1,.75-.35.85.85,0,0,1,.74.28,1.06,1.06,0,0,1,.2.64.91.91,0,0,1-.18.55,1.33,1.33,0,0,1-.26.27l-.34.26a1.91,1.91,0,0,0-.61.68,3.43,3.43,0,0,0-.14,1.06H8.59a1.66,1.66,0,0,1,.06-.54A.93.93,0,0,1,9,6.83l.32-.25A3.29,3.29,0,0,0,10,6a1.62,1.62,0,0,0,.3-1A1.67,1.67,0,0,0,9.6,3.49ZM15,12V1H1V12H7.3v1.1H4v1.8h8V13.1H8.7V12ZM2.4,10.6V2.4H13.6v8.2Z" />
          </g>
        </svg>
      );
  }
}

export default SVG;
