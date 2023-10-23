import React from "react";
import { createRoot } from "react-dom/client";

import Popup from "./Popup";
import "./index.css";

const rootElement = document.getElementById("__root");
const root = createRoot(rootElement!);

root.render(<Popup />);
