import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
// import { observable } from 'mobx';
// import { observer } from 'mobx-react';
import { useLocalStore, useObserver } from 'mobx-react-lite';

const UIContainer = ({ showUi }) => {
  // @observable counter = 0;
  const todo = useLocalStore(() => ({
    title: 'Test',
    done: true,
    toggle() {
      this.done = !this.done;
    },
  }));

  function handleResize() {}

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div />;
};

export default UIContainer;
