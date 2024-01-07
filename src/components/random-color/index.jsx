import { useEffect, useState } from "react";

import "./styles.css";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  //Helper function to convert numbers to two-character hex string
  const convert = (value) => {
    if (typeOfColor === "hex") {
      const hex = value.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    } else {
      const base10 = value.toString(10);
      return base10;
    }
  };

  function handleCreateRandomColor() {
    //if color is hex
    if (typeOfColor === "hex") {
      //Generate and concat hex values for red,green,blue
      const red = convert(Math.floor(Math.random() * 256));
      const green = convert(Math.floor(Math.random() * 256));
      const blue = convert(Math.floor(Math.random() * 256));

      setColor("#" + red + green + blue);
      // else rgb
    } else {
      setColor(
        "rgb(" +
          Math.floor(Math.random() * 255) +
          ", " +
          Math.floor(Math.random() * 255) +
          ", " +
          Math.floor(Math.random() * 255) +
          ")"
      );
    }
  }

  useEffect(() => {
    if (typeOfColor === "rgb" && color.startsWith("#")) {
      // Convert HEX to RGB
      const rgb = `rgb(${parseInt(color.substring(1, 3), 16)}, ${parseInt(
        color.substring(3, 5),
        16
      )}, ${parseInt(color.substring(5), 16)})`;
      setColor(rgb);
    } else if (typeOfColor === "hex" && color.startsWith("rgb")) {
      //makes a copy of color to modify
      const colorCopy = color;
      //remove 'rgb(' and ')'
      const colors = colorCopy.slice(4, -1);
      //destructure r g b by splitting by ','
      const [red, green, blue] = colors
        .split(",")
        .map((num) => parseInt(num.trim(), 10));
      const hex = `#${convert(red)}${convert(green)}${convert(blue)}`;
      setColor(hex);
    }
  }, [typeOfColor]);

  return (
    <div className="container" style={{ background: color }}>
      <button
        onClick={() => {
          setTypeOfColor("hex");
        }}
        className="start"
      >
        Create HEX Color
      </button>
      <button
        onClick={() => {
          setTypeOfColor("rgb");
        }}
        className="middle"
      >
        Create RGB Color
      </button>
      <button onClick={handleCreateRandomColor} className="end">
        Generate Random Color
      </button>
      <div className="display">
        <h3>{typeOfColor === "hex" ? "HEX Color" : "RGB Color"}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
