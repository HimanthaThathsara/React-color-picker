import { useState } from "react";
import styles from "./App.module.css";
import { ToastContainer, toast } from 'react-toastify';
import { IoApertureOutline, IoImages } from "react-icons/io5";


const App = () => {
  const [color, setColor] = useState("#fff");
  const [image, setImage] = useState(null);

  const open_Eye_Dropper = async () => {
    let Eye_Dropper = new EyeDropper();
    const { sRGBHex } = await Eye_Dropper.open();
    setColor(sRGBHex);
  };

  const handle_File_Input = (file) => {
    setImage(URL.createObjectURL(file.target.files[0]));
  };

  const Toast_Layout = () => {
    toast(<>
      <IoApertureOutline size="20" className={styles.iconDone} />
      Copied to clipboard!
    </>,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Zoom,
      });
  };

  const Copy_Color = async () => {
    await navigator.clipboard.writeText(color);
    Toast_Layout();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftColumn}>
        <h1 className={styles.headingText}>Pick color</h1>

        <div className={styles.formSection}>
          <input onChange={handle_File_Input} type="file" accept="image/*" />
        </div>

        <div className={styles.formSection}>
          <button className={styles.openPickerButton} onClick={open_Eye_Dropper}>
            Open Eyedropper
          </button>
        </div>

        <div className={styles.formSection}>
          <button
            className={styles.selectedColor}
            style={{ background: color }}
            onClick={Copy_Color}
          >
            <span>{color}</span>
          </button>
        </div>
      </div>

      <div className={styles.rightColumn}>
        {image ? (
          <>
            <img src={image} alt={image} />
            <div
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          </>
        ) : (
          <IoImages size="70" />
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      // transition={Zoom}
      />

    </div>
  );
};

export default App;
