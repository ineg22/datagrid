import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StateType } from '../../../types/index';
import VisibleRows from './VisibleRows';
import { setVisibleRows } from '../../../actions/index';

const CustomVList: React.FC = () => {
  const dispatch = useDispatch();
  const { transformed } = useSelector((state: StateType) => ({
    transformed: state.transformed,
  }));

  const rowHeight = 30;
  const headerHeight = 165;
  const fullHeight = transformed ? headerHeight + rowHeight * transformed.length : headerHeight;

  let { pageYOffset } = window;
  const { innerHeight } = window;
  if (pageYOffset + innerHeight > fullHeight) {
    pageYOffset = fullHeight - innerHeight;
  }
  const viewPort = innerHeight - headerHeight;

  const firstPerson = transformed ? (transformed.length * rowHeight < viewPort ? 0 : Math.floor(pageYOffset / 30)) : 0;

  const [topVirtualSize, setTopVirtualSize] = useState(firstPerson * 30);
  const [bottomVirtualSize, setBottomVirtualSize] = useState(fullHeight - innerHeight > 0 ? fullHeight - innerHeight - firstPerson * 30 : 0);

  const virtualUpdate = (): void => {
    const fullHeight = transformed ? headerHeight + rowHeight * transformed.length : headerHeight;

    let { pageYOffset } = window;
    const { innerHeight } = window;

    const viewPort = innerHeight - headerHeight;
    const visibleRowsCount = Math.floor(viewPort / rowHeight + 2);
    if (pageYOffset + innerHeight > fullHeight) {
      pageYOffset = fullHeight - innerHeight;
    }
    const firstPerson = transformed ? (transformed.length * rowHeight < viewPort ? 0 : Math.floor(pageYOffset / 30)) : 0;
    setTopVirtualSize(firstPerson * 30);
    setBottomVirtualSize(fullHeight - innerHeight > 0 ? fullHeight - innerHeight - firstPerson * 30 : 0);

    dispatch(setVisibleRows([firstPerson, firstPerson + visibleRowsCount]));
  };

  useEffect(() => {
    document.addEventListener('scroll', virtualUpdate);
    virtualUpdate();
    return (): void => {
      document.removeEventListener('scroll', virtualUpdate);
    };
  }, [transformed]);

  return (
    <div className="rowContainer">
      <div className="blockBefore" style={{ height: `${topVirtualSize}px` }}></div>
      <VisibleRows />
      <div className="blockAfter" style={{ height: `${bottomVirtualSize}px` }}></div>
    </div>
  );
};

export default CustomVList;
