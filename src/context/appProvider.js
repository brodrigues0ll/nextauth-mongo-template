"use client";

import React, { useState } from "react";
import AppContext from "./appContext";

function AppProvider({ children }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(true);

  const contextValue = {
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    isMenuOpen,
    setIsMenuOpen,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export default AppProvider;
