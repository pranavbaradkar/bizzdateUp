import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Progress = ({ location: { pathname } }) => {
  const isFirstStep = pathname === '/';
  const isSecondStep = pathname === '/second';
  const isThirdStep = pathname === '/third';
  const isFourthStep = pathname === '/fourth'; 
  const isLoginPage = pathname === '/login';

  return (
    <React.Fragment>
      {!isLoginPage ? (
        <div className="steps">
          <div className={`${isFirstStep ? 'step active' : 'step'}`}>
            <div>1</div>
            <div>
              {isSecondStep || isThirdStep || isFourthStep ? (
                <Link to="/">Step 1</Link>
              ) : (
                'Step 1'
              )}
            </div>
          </div>
          <div className={`${isSecondStep ? 'step active' : 'step'}`}>
            <div>2</div>
            <div>
              {isFourthStep || isThirdStep ? <Link to="/second">Step 2</Link> : 'Step 2'}
            </div>
          </div>
          <div className={`${isFourthStep ? 'step active' : 'step'}`}>
            <div>3</div>
            <div>
              {isThirdStep ? <Link to="/fourth">Step 3</Link> : 'Step 3'}
            </div>
          </div>
          <div className={`${pathname === '/third' ? 'step active' : 'step'}`}>
            <div>4</div>
            <div>Step 4</div>
          </div>
        </div>
      ) : (
        <div>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(Progress);
