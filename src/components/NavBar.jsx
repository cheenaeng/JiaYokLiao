import React from 'react';
import {
  HStack, Icon, Button,
} from '@chakra-ui/react';
import {
  MdOutlineHome, MdEditNote, MdOutlineLibraryAdd, MdOutlineLibraryBooks,
} from 'react-icons/md';

function NavBar({
  setMedDetailsView, setDashboardView, setUserFormView, setMedListView,
}) {
  const setViews = (viewToAppear) => {
    setMedDetailsView(false);
    setDashboardView(false);
    setUserFormView(false);
    setMedListView(false);

    switch (viewToAppear) {
      case 'library': {
        setMedDetailsView(true);
        break;
      }
      case 'dashboard': {
        setDashboardView(true);
        break;
      }
      case 'addForm': {
        setUserFormView(true);
        break;
      }
      case 'medList': {
        setMedListView(true);
        break;
      }
      default: {
        setDashboardView(true);
      }
    }
  };
  return (
    <HStack justify="space-evenly" className="nav-bar-bar">
      <Button variant="ghost" onClick={() => { setViews('library'); }}>
        <Icon as={MdOutlineLibraryBooks} className="navbar-icon" />
      </Button>
      <Button variant="ghost" onClick={() => { setViews('medList'); }}>
        <Icon as={MdEditNote} className="navbar-icon" />
      </Button>
      <Button variant="ghost" onClick={() => { setViews('dashboard'); }}>
        <Icon as={MdOutlineHome} className="navbar-icon" />
      </Button>
      <Button variant="ghost" onClick={() => { setViews('addForm'); }}>
        <Icon as={MdOutlineLibraryAdd} className="navbar-icon" />
      </Button>
    </HStack>
  );
}

export default NavBar;
